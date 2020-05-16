(module
 (type $none_=>_i32 (func (result i32)))
 (type $none_=>_none (func))
 (type $i32_=>_none (func (param i32)))
 (type $i32_f64_f64_f64_=>_none (func (param i32 f64 f64 f64)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (import "env" "memory" (memory $0 1))
 (data (i32.const 1024) "\1c\00\00\00\01\00\00\00\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data (i32.const 1072) "&\00\00\00\01\00\00\00\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $mandelbrot/data (mut i32) (i32.const 0))
 (export "memory" (memory $0))
 (export "mandelbrot" (func $mandelbrot/mandelbrot))
 (export "getData" (func $mandelbrot/getData))
 (export "getDataBuffer" (func $mandelbrot/getDataBuffer))
 (start $~start)
 (func $~lib/rt/stub/__alloc (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.const 1073741808
  i32.gt_u
  if
   unreachable
  end
  global.get $~lib/rt/stub/offset
  i32.const 16
  i32.add
  local.tee $4
  local.get $0
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $2
  i32.const 16
  local.get $2
  i32.const 16
  i32.gt_u
  select
  local.tee $6
  i32.add
  local.tee $2
  memory.size
  local.tee $5
  i32.const 16
  i32.shl
  local.tee $3
  i32.gt_u
  if
   local.get $5
   local.get $2
   local.get $3
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $3
   local.get $5
   local.get $3
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $3
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $2
  global.set $~lib/rt/stub/offset
  local.get $4
  i32.const 16
  i32.sub
  local.tee $2
  local.get $6
  i32.store
  local.get $2
  i32.const 1
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=12
  local.get $4
 )
 (func $~lib/memory/memory.fill (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8
   local.get $0
   i32.const 3839996
   i32.add
   local.tee $1
   i32.const 0
   i32.store8 offset=3
   local.get $0
   i32.const 0
   i32.store8 offset=1
   local.get $0
   i32.const 0
   i32.store8 offset=2
   local.get $1
   i32.const 0
   i32.store8 offset=2
   local.get $1
   i32.const 0
   i32.store8 offset=1
   local.get $0
   i32.const 0
   i32.store8 offset=3
   local.get $1
   i32.const 0
   i32.store8
   local.get $0
   i32.const 0
   local.get $0
   i32.sub
   i32.const 3
   i32.and
   local.tee $1
   i32.add
   local.tee $0
   i32.const 0
   i32.store
   local.get $0
   i32.const 3840000
   local.get $1
   i32.sub
   i32.const -4
   i32.and
   local.tee $2
   i32.add
   i32.const 28
   i32.sub
   local.tee $1
   i32.const 0
   i32.store offset=24
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $1
   i32.const 0
   i32.store offset=20
   local.get $2
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=12
   local.get $0
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.const 0
   i32.store offset=20
   local.get $0
   i32.const 0
   i32.store offset=24
   local.get $1
   i32.const 0
   i32.store
   local.get $1
   i32.const 0
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=12
   local.get $0
   local.get $0
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $1
   i32.add
   local.set $0
   local.get $2
   local.get $1
   i32.sub
   local.set $1
   loop $while-continue|0
    local.get $1
    i32.const 32
    i32.ge_u
    if
     local.get $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     local.get $0
     i64.const 0
     i64.store offset=16
     local.get $0
     i64.const 0
     i64.store offset=24
     local.get $1
     i32.const 32
     i32.sub
     local.set $1
     local.get $0
     i32.const 32
     i32.add
     local.set $0
     br $while-continue|0
    end
   end
  end
 )
 (func $mandelbrot/mandelbrot (param $0 i32) (param $1 f64) (param $2 f64) (param $3 f64)
  (local $4 i32)
  (local $5 i32)
  (local $6 f64)
  (local $7 i32)
  (local $8 i32)
  (local $9 f64)
  (local $10 f64)
  (local $11 f64)
  (local $12 i32)
  (local $13 i32)
  (local $14 f64)
  (local $15 f64)
  (local $16 f64)
  local.get $3
  f64.const 800
  f64.mul
  f64.const 1200
  f64.div
  local.set $14
  loop $for-loop|0
   local.get $8
   i32.const 800
   i32.lt_s
   if
    i32.const 0
    local.set $7
    loop $for-loop|1
     local.get $7
     i32.const 1200
     i32.lt_s
     if
      local.get $1
      local.get $3
      local.get $7
      f64.convert_i32_s
      f64.const 8.333333333333334e-04
      f64.mul
      f64.const 1
      f64.sub
      f64.mul
      f64.add
      local.set $15
      local.get $2
      local.get $14
      local.get $8
      f64.convert_i32_s
      f64.const 0.00125
      f64.mul
      f64.const 1
      f64.sub
      f64.mul
      f64.add
      local.set $16
      f64.const 0
      local.set $6
      i32.const 0
      local.set $5
      f64.const 0
      local.set $9
      f64.const 0
      local.set $10
      f64.const 0
      local.set $11
      loop $while-continue|0
       local.get $5
       local.get $0
       i32.lt_u
       if (result i32)
        local.get $11
        local.get $11
        f64.mul
        local.get $6
        local.get $6
        f64.mul
        f64.add
        f64.const 4
        f64.le
       else
        i32.const 0
       end
       if
        local.get $9
        local.get $10
        f64.mul
        local.set $6
        local.get $9
        local.get $9
        f64.mul
        local.get $10
        local.get $10
        f64.mul
        f64.sub
        local.get $15
        f64.add
        local.tee $11
        local.set $9
        local.get $6
        local.get $6
        f64.add
        local.get $16
        f64.add
        local.tee $6
        local.set $10
        local.get $5
        i32.const 1
        i32.add
        local.set $5
        br $while-continue|0
       end
      end
      local.get $7
      local.get $8
      i32.const 1200
      i32.mul
      i32.add
      i32.const 2
      i32.shl
      local.tee $12
      global.get $mandelbrot/data
      i32.load offset=4
      i32.add
      local.get $0
      local.get $5
      i32.eq
      local.tee $13
      if (result i32)
       i32.const 0
      else
       block $mandelbrot/colour|inlined.0
        local.get $5
        i32.const 2
        i32.shl
        i32.const 1023
        i32.and
        local.tee $4
        i32.const 256
        i32.lt_u
        br_if $mandelbrot/colour|inlined.0
        local.get $4
        i32.const 512
        i32.lt_u
        if
         i32.const 510
         local.get $4
         i32.sub
         local.set $4
         br $mandelbrot/colour|inlined.0
        end
        i32.const 0
        local.set $4
       end
       local.get $4
       i32.const 255
       i32.and
      end
      i32.store8
      global.get $mandelbrot/data
      i32.load offset=4
      local.get $12
      i32.const 1
      i32.add
      i32.add
      local.get $13
      if (result i32)
       i32.const 0
      else
       block $mandelbrot/colour|inlined.1
        local.get $5
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
      i32.store8
      global.get $mandelbrot/data
      i32.load offset=4
      local.get $12
      i32.const 2
      i32.add
      i32.add
      local.get $13
      if (result i32)
       i32.const 0
      else
       block $mandelbrot/colour|inlined.2
        local.get $5
        i32.const 2
        i32.shl
        i32.const 356
        i32.add
        i32.const 1023
        i32.and
        local.tee $4
        i32.const 256
        i32.lt_u
        br_if $mandelbrot/colour|inlined.2
        local.get $4
        i32.const 512
        i32.lt_u
        if
         i32.const 510
         local.get $4
         i32.sub
         local.set $4
         br $mandelbrot/colour|inlined.2
        end
        i32.const 0
        local.set $4
       end
       local.get $4
       i32.const 255
       i32.and
      end
      i32.store8
      global.get $mandelbrot/data
      i32.load offset=4
      local.get $12
      i32.const 3
      i32.add
      i32.add
      i32.const 255
      i32.store8
      local.get $7
      i32.const 1
      i32.add
      local.set $7
      br $for-loop|1
     end
    end
    local.get $8
    i32.const 1
    i32.add
    local.set $8
    br $for-loop|0
   end
  end
 )
 (func $mandelbrot/getData (result i32)
  global.get $mandelbrot/data
 )
 (func $mandelbrot/getDataBuffer (result i32)
  global.get $mandelbrot/data
  i32.load
 )
 (func $~start
  (local $0 i32)
  (local $1 i32)
  i32.const 1136
  global.set $~lib/rt/stub/offset
  i32.const 12
  i32.const 3
  call $~lib/rt/stub/__alloc
  local.tee $0
  i32.eqz
  if
   i32.const 12
   i32.const 2
   call $~lib/rt/stub/__alloc
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
  i32.const 3840000
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $1
  call $~lib/memory/memory.fill
  local.get $0
  i32.load
  drop
  local.get $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 3840000
  i32.store offset=8
  local.get $0
  global.set $mandelbrot/data
 )
)
