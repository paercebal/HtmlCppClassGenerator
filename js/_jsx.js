//////////////////////////////////////////////////////////////////
//
// jsx_error_data
//
//////////////////////////////////////////////////////////////////

class jsx_error_data
{
   constructor(p_function, p_file, p_line, p_column)
   {
      this.m_function = p_function + "";
      this.m_file = p_file + "";
      this.m_line = parseInt(p_line, 10);
      this.m_column = parseInt(p_column, 10);
   }
   
   toString()
   {
      return this.m_function + "@" + this.m_file + ":" + this.m_line + ":" + this.m_column;
   }
} // class jsx_error_data

//////////////////////////////////////////////////////////////////
//
// jsx_error
//
//////////////////////////////////////////////////////////////////

class jsx_error extends Error
{
   static parse_stack(p_exception)
   {
      let str = p_exception.stack + "";

      const regex = /^([^\@]*)\@.*\/([^\/:]*):?([^\/:]*)?:?([^\/:]*)?$/gm;

      let m;
      let f_stack = [];

      while ((m = regex.exec(str)) !== null)
      {
         // This is necessary to avoid infinite loops with zero-width matches
         if (m.index === regex.lastIndex)
         {
            regex.lastIndex++;
         }
          
          // The result can be accessed through the `m`-variable.
         // m.forEach((match, groupIndex) =>
            // {
               // console.log(`Found match, group ${groupIndex}: ${match}`);
            // });
         f_stack.push(new jsx_error_data(m[1], m[2], m[3], m[4]));
      }

      return f_stack.filter((o) =>
         {
            if(o.m_function.startsWith("jsx_error") ||
               o.m_function.startsWith("do_throw"))
            {
               return false;
            }

            return true;
         });
   }
   
   static to_string(p_exception)
   {
      return p_exception.toString() + "\n" + jsx_error.parse_stack(p_exception).join("\n");
   }
   
   parsed_stack()
   {
      return jsx_error.parse_stack(this);
   }
   
   toString()
   {
      return "jsx_error: " + this.message + "\n" + this.parsed_stack().join("\n");
   }
} // class jsx_error

//////////////////////////////////////////////////////////////////
//
// jsx
//
//////////////////////////////////////////////////////////////////

class jsx
{
   static do_throw(p_message)
   {
      throw new jsx_error(p_message);
   }

   static any_to_string(p_any)
   {
      if(p_any === undefined) return "<undefined>";
      if(p_any === null) return "<null>";
      if(typeof p_any === "string") return p_any.toString();
      if(Array.isArray(p_any)) return JSON.stringify(p_any);
      return JSON.stringify(p_any);
   }

   static cast_to_null_if_undefined(p_object)
   {
      if(p_object === undefined) return null;
      return p_object;
   }

   static cast_to_boolean(p_any)
   {
      return !!p_any;
   }
   
   static cast_to_integer(p_any)
   {
      let i = parseInt(p_any, 10);
      if(isNaN(i)) jsx.do_throw("Value [" + p_any + "] is not an integer");
      return i;
   }
   
   static log(...p_args)
   {
      let logs = document.getElementById("ID_logs");
      if(logs)
      {
         logs.value += p_args.map( (p_item) => { return jsx.any_to_string(p_item); } ).join("") + "\n";
      }
   };

   static log_error(...p_args)
   {
      jsx.log("[ERROR] ", ...p_args);
   }
   
   static id(p_id)
   {
      let o = document.getElementById(p_id);
      if(o == null) jsx.log_error("jsx.id(\"" + p_id + "\") found null");
      return o;
   }

   static post_task(p_callback)
   {
      // clearTimeout()
      return window.setTimeout(p_callback, 250);
   }

   static set_timer_task(p_callback)
   {
      // clearInterval()
      return window.setInterval(p_callback, 250);
   }
   
   static on_load_execute(p_callback)
   {
      window.addEventListener("load",
         (p_event) =>
         {
            p_callback(p_event);
         }
      );
   }

   static clear_task(p_task_id)
   {
      window.clearInterval(p_task_id);
   }

   static execute_function_by_name(functionName, ...p_args)
   {
      // To be hardened: eval() is evil
      return eval(functionName)(...p_args);
   }
} // class jsx

