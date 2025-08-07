const jsx = {};
jsx.regex = {};
jsx.html = {};
jsx.html.select = {};

jsx.any_to_string = (p_any) =>
   {
      if(p_any === undefined) return "<undefined>";
      if(p_any === null) return "<null>";
      if(typeof p_any === "string") return p_any.toString();
      if(Array.isArray(p_any)) return JSON.stringify(p_any);
      return JSON.stringify(p_any);
   };

jsx.log = (...p_args) =>
   {
      let logs = document.getElementById("ID_logs");
      logs.value += p_args.map( (p_item) => { return jsx.any_to_string(p_item); } ).join("") + "\n";
   };

jsx.log_error = (...p_args) =>
   {
      jsx.log("[ERROR] ", ...p_args);
   };


jsx.id = (p_id) =>
   {
      let o = document.getElementById(p_id);
      if(o == null) jsx.log_error("jsx.id(\"" + p_id + "\") found null");
      return o;
   };

jsx.post_task = (p_callback) =>
   {
      window.setTimeout(p_callback, 250);
   }

jsx.set_timer_task = (p_callback) =>
   {
      window.setInterval(p_callback, 250);
   }

jsx.execute_function_by_name = (functionName, ...p_args) =>
   {
      // To be hardened: eval() is evil
      return eval(functionName)(...p_args);
   };

jsx.regex.is_exactly = (p_text, p_pattern) =>
   {
      let rx = new RegExp(p_pattern, "gm");
      let result = p_text.match(rx);
      
      let is_valid = false;

      if(Array.isArray(result) && (result.length == 1))
      {
         is_valid = p_text == result[0];
      }
      
      return is_valid;
   };

jsx.html.is_element = (p_id_or_element, p_name) =>
   {
      if(p_id_or_element instanceof HTMLElement)
      {
         let o = p_id_or_element;

         return (o.tagName == p_name);
      }
      else if(typeof p_id_or_element === "string")
      {
         let p_id = p_id_or_element;
         
         return (jsx.id(p_id).tagName == p_name);
      }
      
      return false;
   };

jsx.html.assert_element = (p_id_or_element, p_name) =>
   {
      if(! jsx.html.is_element(p_id_or_element, p_name))
      {
         jsx.log_error("jsx.html.assert_element(\"", JSON.stringify(o), "\", \"", p_name, "\") is not a \"", p_name, "\" element.");
      }
   };

jsx.html.is_valid = (p_htmlx_element) =>
   {
      if(p_htmlx_element.hasAttribute("validity_function"))
      {
         let function_name = p_htmlx_element.getAttribute("validity_function");
         
         if(function_name.length > 0)
         {
            return jsx.execute_function_by_name(function_name, p_htmlx_element.jsx_get_value());
         }
      }

      if(p_htmlx_element.hasAttribute("validity_pattern"))
      {
         let pattern = p_htmlx_element.getAttribute("validity_pattern");
         
         if(pattern.length > 0)
         {
            return jsx.regex.is_exactly(p_htmlx_element.jsx_get_value(), pattern);
         }
      }

      return null;
   };

jsx.html.check_validity = (p_htmlx_element) =>
   {
      let is_valid = jsx.html.is_valid(p_htmlx_element);
      jsx.log("is_validity: ", is_valid);
      
      if(is_valid == null)
      {
         p_htmlx_element.removeAttribute("htmlx_is_valid");
      }
      else if(is_valid)
      {
         p_htmlx_element.setAttribute("htmlx_is_valid", "true");
      }
      else
      {
         p_htmlx_element.setAttribute("htmlx_is_valid", "false");
      }
   };

jsx.html.enrich_elements = (p_event, p_elements_enricher) =>
   {
      let elements_to_validate = [];
      
      const enrich_input = (p_input) =>
      {
         jsx.html.assert_element(p_input.getAttribute("id"), "INPUT");
         
         elements_to_validate.push(p_input);

         p_input.jsx_get_value = () =>
            {
               return p_input.value;
            };

         p_input.jsx_set_value = (p_value) =>
            {
               p_input.value = p_value;
            };
            
         p_input.jsx_is_valid = () =>
            {
               return jsx.html.is_valid(p_input);
            };

         p_input.jsx_get_value_if_valid = () =>
            {
               if(jsx.html.is_valid(p_input))
               {
                  return p_input.value;
               }
               
               return null;
            };

         p_input.addEventListener("change",
               (p_event) =>
               {
                  jsx.html.check_validity(p_input);
                  p_elements_enricher.on_input_change(p_input, p_event);
               }
            );

         p_input.addEventListener("keyup",
               (p_event) =>
               {
                  jsx.html.check_validity(p_input);
                  p_elements_enricher.on_input_change(p_input, p_event);
               }
            );
      }
      
      const enrich_select = (p_select) =>
      {
         jsx.html.assert_element(p_select.getAttribute("id"), "SELECT");

         elements_to_validate.push(p_select);

         if(p_select.multiple)
         {
            // TODO
         }
         else
         {
            p_select.jsx_get_selected_index = () =>
               {
                  return p_select.selectedIndex;
               };

            p_select.jsx_set_selected_index = (p_index) =>
               {
                  p_select.selectedIndex = p_index;
               };

            p_select.jsx_get_value = () =>
               {
                  let index = p_select.selectedIndex;
                  if(index == -1) return null;
                  let option = p_select.options.item(index);
                  return option.value;
               };

            p_select.jsx_set_value = (p_value) =>
               {
                  let index = -1;
                  let os = p_select.options;
                  for(let i = 0; i < os.length; i++)
                  {
                     let o = os.item(i);
                     if(o.value == p_value)
                     {
                        index = i;
                        break;
                     }
                  }
                  
                  p_select.selectedIndex = index;
               };

            p_select.jsx_is_valid = () =>
               {
                  return jsx.html.is_valid(p_select);
               };

            p_select.jsx_get_value_if_valid = () =>
               {
                  if(jsx.html.is_valid(p_select))
                  {
                     return p_select.jsx_get_value();
                  }
                  
                  return null;
               };

         }
         
         p_select.addEventListener("change",
               (p_event) =>
               {
                  jsx.html.check_validity(p_select);
                  p_elements_enricher.on_select_change(p_select, p_event);
               }
            );
      };

      const enrich_any_element = (p_element_name, p_callback) =>
      {
         let elements = document.getElementsByTagName(p_element_name);
         Array.from(elements).forEach(p_callback);
      };

      enrich_any_element("select", enrich_select);
      enrich_any_element("input", enrich_input);
      
      elements_to_validate.forEach(
            (p_element) =>
            {
               jsx.html.check_validity(p_element);
            }
         );
   };

