(module
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$viddd (func (param i32 f64 f64 f64)))
 (type $FUNCSIG$iddi (func (param f64 f64 i32) (result i32)))
 (type $FUNCSIG$i (func (result i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (import "env" "memory" (memory $0 1))
 (data (i32.const 8) "\1b\00\00\00~\00l\00i\00b\00/\00i\00n\00t\00e\00r\00n\00a\00l\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 72) "\1c\00\00\00~\00l\00i\00b\00/\00i\00n\00t\00e\00r\00n\00a\00l\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (table $0 1 funcref)
 (elem (i32.const 0) $null)
 (global $~lib/allocator/arena/startOffset (mut i32) (i32.const 0))
 (global $~lib/allocator/arena/offset (mut i32) (i32.const 0))
 (global $mandelbrot/data (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (export "mandelbrot" (func $mandelbrot/mandelbrot))
 (export "getData" (func $mandelbrot/getData))
 (export "getDataBuffer" (func $mandelbrot/getDataBuffer))
 (start $start)
 (func $~lib/allocator/arena/__memory_allocate (; 0 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.const 1073741824
  i32.gt_u
  if
   unreachable
  end
  global.get $~lib/allocator/arena/offset
  local.tee $1
  local.get $0
  i32.const 1
  local.get $0
  i32.const 1
  i32.gt_u
  select
  i32.add
  i32.const 7
  i32.add
  i32.const -8
  i32.and
  local.tee $2
  current_memory
  local.tee $3
  i32.const 16
  i32.shl
  i32.gt_u
  if
   local.get $3
   local.get $2
   local.get $1
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $0
   local.get $3
   local.get $0
   i32.gt_s
   select
   grow_memory
   i32.const 0
   i32.lt_s
   if
    local.get $0
    grow_memory
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $2
  global.set $~lib/allocator/arena/offset
  local.get $1
 )
 (func $~lib/internal/memory/memset (; 1 ;) (type $FUNCSIG$vi) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 0
  i32.store8
  local.get $0
  i32.const 3840000
  i32.add
  local.tee $1
  i32.const 1
  i32.sub
  i32.const 0
  i32.store8
  local.get $0
  i32.const 1
  i32.add
  i32.const 0
  i32.store8
  local.get $0
  i32.const 2
  i32.add
  i32.const 0
  i32.store8
  local.get $1
  i32.const 2
  i32.sub
  i32.const 0
  i32.store8
  local.get $1
  i32.const 3
  i32.sub
  i32.const 0
  i32.store8
  local.get $0
  i32.const 3
  i32.add
  i32.const 0
  i32.store8
  local.get $1
  i32.const 4
  i32.sub
  i32.const 0
  i32.store8
  i32.const 0
  local.get $0
  i32.sub
  i32.const 3
  i32.and
  local.tee $1
  local.get $0
  i32.add
  local.tee $0
  i32.const 0
  i32.store
  i32.const 3840000
  local.get $1
  i32.sub
  i32.const -4
  i32.and
  local.tee $2
  local.get $0
  i32.add
  i32.const 4
  i32.sub
  i32.const 0
  i32.store
  local.get $2
  i32.const 8
  i32.le_u
  if
   return
  end
  local.get $0
  i32.const 4
  i32.add
  i32.const 0
  i32.store
  local.get $0
  i32.const 8
  i32.add
  i32.const 0
  i32.store
  local.get $0
  local.get $2
  i32.add
  local.tee $1
  i32.const 12
  i32.sub
  i32.const 0
  i32.store
  local.get $1
  i32.const 8
  i32.sub
  i32.const 0
  i32.store
  local.get $2
  i32.const 24
  i32.le_u
  if
   return
  end
  local.get $0
  i32.const 12
  i32.add
  i32.const 0
  i32.store
  local.get $0
  i32.const 16
  i32.add
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.add
  i32.const 0
  i32.store
  local.get $0
  i32.const 24
  i32.add
  i32.const 0
  i32.store
  local.get $0
  local.get $2
  i32.add
  local.tee $1
  i32.const 28
  i32.sub
  i32.const 0
  i32.store
  local.get $1
  i32.const 24
  i32.sub
  i32.const 0
  i32.store
  local.get $1
  i32.const 20
  i32.sub
  i32.const 0
  i32.store
  local.get $1
  i32.const 16
  i32.sub
  i32.const 0
  i32.store
  local.get $0
  i32.const 4
  i32.and
  i32.const 24
  i32.add
  local.tee $1
  local.get $0
  i32.add
  local.set $0
  local.get $2
  local.get $1
  i32.sub
  local.set $2
  loop $continue|0
   local.get $2
   i32.const 32
   i32.ge_u
   if
    local.get $0
    i64.const 0
    i64.store
    local.get $0
    i32.const 8
    i32.add
    i64.const 0
    i64.store
    local.get $0
    i32.const 16
    i32.add
    i64.const 0
    i64.store
    local.get $0
    i32.const 24
    i32.add
    i64.const 0
    i64.store
    local.get $2
    i32.const 32
    i32.sub
    local.set $2
    local.get $0
    i32.const 32
    i32.add
    local.set $0
    br $continue|0
   end
  end
 )
 (func $~lib/internal/typedarray/TypedArray<u8>#constructor (; 2 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  i32.const 4194304
  call $~lib/allocator/arena/__memory_allocate
  local.tee $1
  i32.const 3840000
  i32.store
  local.get $1
  i32.const 8
  i32.add
  call $~lib/internal/memory/memset
  local.get $0
  i32.eqz
  if
   i32.const 12
   call $~lib/allocator/arena/__memory_allocate
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  local.get $1
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 3840000
  i32.store offset=8
  local.get $0
 )
 (func $mandelbrot/iterateEquation (; 3 ;) (type $FUNCSIG$iddi) (param $0 f64) (param $1 f64) (param $2 i32) (result i32)
  (local $3 f64)
  (local $4 f64)
  (local $5 f64)
  (local $6 i32)
  (local $7 f64)
  (local $8 i32)
  loop $continue|0
   local.get $6
   local.get $2
   i32.lt_u
   local.tee $8
   if
    local.get $7
    local.get $7
    f64.mul
    local.get $3
    local.get $3
    f64.mul
    f64.add
    f64.const 4
    f64.le
    local.set $8
   end
   local.get $8
   if
    local.get $4
    local.get $5
    f64.mul
    local.set $3
    local.get $4
    local.get $4
    f64.mul
    local.get $5
    local.get $5
    f64.mul
    f64.sub
    local.get $0
    f64.add
    local.tee $7
    local.set $4
    local.get $3
    local.get $3
    f64.add
    local.get $1
    f64.add
    local.tee $3
    local.set $5
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    br $continue|0
   end
  end
  local.get $6
 )
 (func $mandelbrot/mandelbrot (; 4 ;) (type $FUNCSIG$viddd) (param $0 i32) (param $1 f64) (param $2 f64) (param $3 f64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 f64)
  local.get $3
  f64.const 800
  f64.mul
  f64.const 1200
  f64.div
  local.set $13
  loop $repeat|0
   local.get $9
   i32.const 800
   i32.lt_s
   if
    i32.const 0
    local.set $7
    loop $repeat|1
     local.get $7
     i32.const 1200
     i32.lt_s
     if
      local.get $1
      local.get $3
      local.get $7
      f64.convert_i32_s
      f64.const 1200
      f64.sub
      f64.const 1200
      f64.div
      f64.mul
      f64.add
      local.get $2
      local.get $13
      local.get $9
      f64.convert_i32_s
      f64.const 800
      f64.sub
      f64.const 800
      f64.div
      f64.mul
      f64.add
      local.get $0
      call $mandelbrot/iterateEquation
      local.set $10
      global.get $mandelbrot/data
      local.tee $4
      local.tee $8
      i32.load offset=4
      local.get $9
      i32.const 1200
      i32.mul
      local.get $7
      i32.add
      i32.const 2
      i32.shl
      local.tee $11
      local.tee $6
      local.get $8
      i32.load
      i32.add
      i32.add
      local.get $0
      local.get $10
      i32.eq
      local.tee $12
      if (result i32)
       i32.const 0
      else       
       i32.const 0
       local.set $6
       i32.const 4
       local.set $4
       block $mandelbrot/colour|inlined.0
        local.get $10
        i32.const 2
        i32.shl
        i32.const 1023
        i32.and
        local.tee $5
        i32.const 256
        i32.lt_u
        br_if $mandelbrot/colour|inlined.0
        local.get $5
        i32.const 512
        i32.lt_u
        if
         i32.const 510
         local.get $5
         i32.sub
         local.set $5
         br $mandelbrot/colour|inlined.0
        end
        i32.const 0
        local.set $5
       end
       local.get $5
       i32.const 255
       i32.and
      end
      i32.store8 offset=8
      local.get $4
      i32.load offset=4
      local.get $4
      i32.load
      local.get $6
      i32.add
      i32.add
      i32.load8_u offset=8
      drop
      global.get $mandelbrot/data
      local.tee $5
      local.tee $8
      i32.load offset=4
      local.get $11
      i32.const 1
      i32.add
      local.tee $6
      local.get $8
      i32.load
      i32.add
      i32.add
      local.get $12
      if (result i32)
       i32.const 0
      else       
       i32.const 128
       local.set $6
       i32.const 4
       local.set $5
       block $mandelbrot/colour|inlined.1
        local.get $10
        i32.const 2
        i32.shl
        i32.const 128
        i32.add
        i32.const 1023
        i32.and
        local.tee $4
        i32.const 256
        i32.lt_u
        br_if $mandelbrot/colour|inlined.1
        local.get $4
        i32.const 512
        i32.lt_u
        if
         i32.const 510
         local.get $4
         i32.sub
         local.set $4
         br $mandelbrot/colour|inlined.1
        end
        i32.const 0
        local.set $4
       end
       local.get $4
       i32.const 255
       i32.and
      end
      i32.store8 offset=8
      local.get $5
      i32.load offset=4
      local.get $5
      i32.load
      local.get $6
      i32.add
      i32.add
      i32.load8_u offset=8
      drop
      global.get $mandelbrot/data
      local.tee $4
      local.tee $8
      i32.load offset=4
      local.get $11
      i32.const 2
      i32.add
      local.tee $6
      local.get $8
      i32.load
      i32.add
      i32.add
      local.get $12
      if (result i32)
       i32.const 0
      else       
       i32.const 356
       local.set $6
       i32.const 4
       local.set $4
       block $mandelbrot/colour|inlined.2
        local.get $10
        i32.const 2
        i32.shl
        i32.const 356
        i32.add
        i32.const 1023
        i32.and
        local.tee $5
        i32.const 256
        i32.lt_u
        br_if $mandelbrot/colour|inlined.2
        local.get $5
        i32.const 512
        i32.lt_u
        if
         i32.const 510
         local.get $5
         i32.sub
         local.set $5
         br $mandelbrot/colour|inlined.2
        end
        i32.const 0
        local.set $5
       end
       local.get $5
       i32.const 255
       i32.and
      end
      i32.store8 offset=8
      local.get $4
      i32.load offset=4
      local.get $4
      i32.load
      local.get $6
      i32.add
      i32.add
      i32.load8_u offset=8
      drop
      global.get $mandelbrot/data
      local.tee $4
      i32.load offset=4
      local.get $11
      i32.const 3
      i32.add
      local.tee $6
      local.get $4
      i32.load
      i32.add
      i32.add
      i32.const 255
      i32.store8 offset=8
      local.get $4
      i32.load offset=4
      local.get $4
      i32.load
      local.get $6
      i32.add
      i32.add
      i32.load8_u offset=8
      drop
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $repeat|1
     end
    end
    local.get $9
    i32.const 1
    i32.add
    local.set $9
    br $repeat|0
   end
  end
 )
 (func $mandelbrot/getData (; 5 ;) (type $FUNCSIG$i) (result i32)
  global.get $mandelbrot/data
 )
 (func $mandelbrot/getDataBuffer (; 6 ;) (type $FUNCSIG$i) (result i32)
  global.get $mandelbrot/data
  i32.load
 )
 (func $start (; 7 ;) (type $FUNCSIG$v)
  i32.const 136
  global.set $~lib/allocator/arena/startOffset
  global.get $~lib/allocator/arena/startOffset
  global.set $~lib/allocator/arena/offset
  i32.const 12
  call $~lib/allocator/arena/__memory_allocate
  call $~lib/internal/typedarray/TypedArray<u8>#constructor
  global.set $mandelbrot/data
 )
 (func $null (; 8 ;) (type $FUNCSIG$v)
  nop
 )
)
