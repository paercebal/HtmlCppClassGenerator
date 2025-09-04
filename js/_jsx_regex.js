//////////////////////////////////////////////////////////////////
//
// jsx_regex
//
//////////////////////////////////////////////////////////////////

class jsx_regex
{
   static is_exactly(p_text, p_pattern)
   {
      let rx = new RegExp(p_pattern, "gm");
      let result = p_text.match(rx);
      
      let is_valid = false;

      if(Array.isArray(result) && (result.length == 1))
      {
         is_valid = p_text == result[0];
      }
      
      return is_valid;
   }
} // class jsx_regex

