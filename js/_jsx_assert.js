//////////////////////////////////////////////////////////////////
//
// jsx_assert
//
//////////////////////////////////////////////////////////////////

class jsx_assert
{
   static is_non_null_object(p_object)
   {
      if(p_object === undefined) jsx.do_throw("p_object is undefined");
      if(p_object === null) jsx.do_throw("p_object is null");
      if(typeof(p_object) !== "object" ) jsx.do_throw("p_object is not an object, and is instead a [" + typeof(p_object) + "] of value [" + p_object + "]");
      return p_object;
   }
   
   static is_non_null_array(p_array)
   {
      if(p_array === undefined) jsx.do_throw("p_array is undefined");
      if(p_array === null) jsx.do_throw("p_array is null");
      if(! Array.isArray(p_array)) jsx.do_throw("p_array is not an array, and is instead a [" + typeof(p_array) + "] of value [" + p_array + "]");
      return p_array;
   }
   
   static is_non_empty_string(p_string)
   {
      if(p_string === undefined) jsx.do_throw("p_string is undefined");
      if(p_string === null) jsx.do_throw("p_string is null");
      if(typeof(p_string) !== "string" ) jsx.do_throw("p_string is not a string, and is instead a [" + typeof(p_string) + "] of value [" + p_string + "]");
      if(p_string == "" ) jsx.do_throw("p_string is empty");
      return p_string;
   }
   
   static is_integer(p_integer)
   {
      if(p_integer === undefined) jsx.do_throw("p_integer is undefined");
      if(p_integer === null) jsx.do_throw("p_integer is null");
      if(typeof(p_integer) !== "number" ) jsx.do_throw("p_integer is not a number, and is instead a [" + typeof(p_integer) + "] of value [" + p_integer + "]");
      if(parseInt(p_integer, 10) !== p_integer) jsx.do_throw("p_integer is a number of value [" + p_integer + "], but not an integer");
      return p_integer;
   }
} // class jsx_assert
