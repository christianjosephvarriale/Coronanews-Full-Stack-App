require 'sqlite/sqlite'

module SQLite

  VERSION = '1.0.2'

class Database

  def query()
    return SQLite::Query.new(self)
  end

end

class Query

  attr_reader :db
  
  def initialize(db)
    @db = db
  end

  def exec(sql)
    stmt = @db.prepare(sql)
    
    return nil if stmt == nil

    recordset = Recordset.new()
    recordset.rows = 0

    # Iterate over result set
    while true
      row     = []
      ordinal = 0

      stmt.each do |name, value|        
        if recordset.rows == 0
          recordset.columns << name
          recordset.headers[name] = ordinal
          recordset.header_names[ordinal] = name
          recordset.header_indexes[name]  = ordinal
          recordset.types << stmt.columnType(ordinal)
          ordinal += 1
        else
          row << value
        end
      end

      recordset.data << row if recordset.rows > 0

      recordset.rows += 1

      if stmt.step() != SQLITE_ROW
        break
      end
    end

    # Subtract 1 for header
    recordset.rows -= 1

    return recordset
  end

end # class Query

# Row/Recordset classes to simplify running queries
class Row

  def initialize(rowset, row)
    @rowset = rowset
    @row    = row
  end

  def keys()
    return @rowset.columns
  end

  def values()
    return @rowset.data[@row]
  end

  def each
    data = @rowset.data[@row]
    0.upto(data.size()-1) do |i|
      yield @rowset.header_names[i], data[i]
    end
  end

  def hashify()
    hash = {}

    self.each do |k,v|
      hash[k] = v
    end

    return hash
  end

  def [](index)
    # If column name
    if index.class == String
      # Convert to ordinal
      index = @rowset.header_indexes[index]
    end

    if index != nil
      return @rowset.data[@row][index]
    end    
  end

end # class Row

class Recordset

  attr_accessor :columns, :headers
  attr_accessor :header_names, :header_indexes 
  attr_accessor :data, :rows, :types

  def initialize()
    @columns        = []
    @types          = []
    @header_names   = {}
    @header_indexes = {}
    @data           = []
    @rows           = 0
    @headers        = {}
  end

  # Return row at given index
  def [](row)
    return nil if row > @rows - 1

    return Row.new(self, row)
  end

  def each()
    0.upto(@rows-1) do |i|
      yield Row.new(self, i)
    end
  end

  def toMsgPack(data=[])
    data << @columns << @types << @data << @headers
    return data.to_msgpack
  end

  def toJson(data=[])
    data << @columns << @types << @data << @headers
    return data.to_json()
  end
  
  def fromMsgPack(binary)
    load MessagePack.unpack(binary)
  end

  def load(data)
    @columns = data[0]
    @types   = data[1]
    @data    = data[2]    
    @headers = data[3]
    @rows    = @data.size

    i = 0
    @columns.each do |c|
      @header_names[i]   = c
      @header_indexes[c] = i
      i += 1
    end
  end

  def to_json()
    content = [@columns, @types, @data]
    return JSON::generate(content, {:pretty_print => true})
  end

  def dump()
    cols = {}
    0.upto(@columns.size-1) do |i|
      cols[i] = @columns[i].size || 0
    end

    self.each do |row|
      0.upto(@columns.size-1) do |i|
        size = row[i].size
        if size > cols[i]
          cols[i] = size
        end
      end
    end

    0.upto(@columns.size-1) do |i|
      printf "%-#{cols[i]+1}s", @columns[i]
      print " | " if i >= 0 and i < (@columns.size - 1)
    end
    puts

    self.each do |row|
      0.upto(@columns.size-1) do |i|
        printf "%-#{cols[i]+1}s", row[i]
        print " | " if i >= 0 and i < (@columns.size - 1)
      end
      puts
    end
  end

end # class Recordset

# Used to serialize/deserialize Recordsets over AMQP message payloads

class Recordsets

  attr_accessor :headers, :recordsets

  # @param binary Optional MesagePack payload. Will deserialize if provided.
  def initialize(binary = nil)
    @headers    = {}
    @recordsets = []

    if not binary.nil?
      from_mpack binary
    end
  end

  def <<(element)
    if element.class != Recordset
      raise "Invalide element type. Must be Recordset"
    end

    @recordsets << element
  end

  # Serilize MessagePack payload
  # @return Returns the serialized data in MessagePack binary format
  def toMsgPack()
    # Convert Ruby Recordset instances to raw array format (JSON-like)
    recordsets = []
    @recordsets.each do |recordset|
      recordsets << [recordset.columns, recordset.types, recordset.rows]
    end

    return MessagePack.pack([@headers, recordsets])
  end

  # Deserilize MessagePack payload
  # @param binary MesagePack payload. Will deserialize if provided.
  def fromMsgPack(binary)
    @recordsets = []

    data = MessagePack.unpack(binary)

    if data[0].class != Hash or data[1].class != Array
      raise "Invalid messagepack format"
    end
  
    @headers = data[0]

    # Convert raw recordset format into Ruby Recordset classes
    data[1].each do |rs|
      recordset = Recordset.new()
      recordset.load(rs)
      @recordsets << recordset      
    end
  end
  
end # class Recordsets

end # module SQLite
