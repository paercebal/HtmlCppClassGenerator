//////////////////////////////////////////////////////////////////
//
// jsx_html
//
//////////////////////////////////////////////////////////////////

class jsx_html
{
   // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

   static get_element_name(p_id_or_element)
   {
      if(p_id_or_element instanceof HTMLElement)
      {
         let o = p_id_or_element;

         return o.tagName;
      }
      else if(typeof p_id_or_element === "string")
      {
         let p_id = p_id_or_element;
         
         return jsx.id(p_id).tagName;
      }
      
      return null;
   }
   
   
   static is_element(p_id_or_element, p_name)
   {
      let name = jsx_html.get_element_name(p_id_or_element);
      
      if(name != null)
      {
         return (name == p_name);
      }
      
      return false;
   }
   

   static assert_element(p_id_or_element, p_name)
   {
      if(! jsx_html.is_element(p_id_or_element, p_name))
      {
         jsx.log_error("jsx_html.assert_element(\"", JSON.stringify(p_id_or_element), "\", \"", p_name, "\") is not a \"", p_name, "\" element.");
      }
   }
   

   static is_valid(p_htmlx_element)
   {
      if(p_htmlx_element.hasAttribute("jsx_validity_function"))
      {
         let function_name = p_htmlx_element.getAttribute("jsx_validity_function");
         
         if(function_name.length > 0)
         {
            return jsx.execute_function_by_name(function_name, p_htmlx_element.jsx_get_value());
         }
      }

      if(p_htmlx_element.hasAttribute("jsx_validity_pattern"))
      {
         let pattern = p_htmlx_element.getAttribute("jsx_validity_pattern");
         
         if(pattern.length > 0)
         {
            return jsx_regex.is_exactly(p_htmlx_element.jsx_get_value(), pattern);
         }
      }

      return null;
   }
   

   static execute_jsx_on_change(p_htmlx_element, p_event)
   {
      if(p_htmlx_element.hasAttribute("jsx_on_change"))
      {
         let function_name = p_htmlx_element.getAttribute("jsx_on_change");
         
         if(function_name.length > 0)
         {
            jsx.execute_function_by_name(function_name, p_htmlx_element, p_event);
         }
      }
   }


   static check_validity(p_htmlx_element)
   {
      let is_valid = jsx_html.is_valid(p_htmlx_element);
      //jsx.log("is_validity: ", is_valid);
      
      if(is_valid == null)
      {
         p_htmlx_element.removeAttribute("jsx_htmlx_is_valid");
      }
      else if(is_valid)
      {
         p_htmlx_element.setAttribute("jsx_htmlx_is_valid", "true");
      }
      else
      {
         p_htmlx_element.setAttribute("jsx_htmlx_is_valid", "false");
      }
   }


   static enrich_element_input(p_input)
   {
      jsx_html.assert_element(p_input.getAttribute("id"), "INPUT");
      
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
            return jsx_html.is_valid(p_input);
         };

      p_input.jsx_get_value_if_valid = () =>
         {
            if(jsx_html.is_valid(p_input))
            {
               return p_input.value;
            }
            
            return null;
         };

      p_input.jsx_get_value_if_not_invalid = () =>
         {
            let v = jsx_html.is_valid(p_input);
            
            if(v === null || v)
            {
               return p_input.value;
            }
            
            return null;
         };

      p_input.addEventListener("change",
            (p_event) =>
            {
               jsx_html.check_validity(p_input);
               jsx_html.execute_jsx_on_change(p_input, p_event);
            }
         );

      p_input.addEventListener("keyup",
            (p_event) =>
            {
               jsx_html.check_validity(p_input);
               jsx_html.execute_jsx_on_change(p_input, p_event);
            }
         );
   }


   static enrich_element_select(p_select)
   {
      jsx_html.assert_element(p_select.getAttribute("id"), "SELECT");

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
               return jsx_html.is_valid(p_select);
            };

         p_select.jsx_get_value_if_valid = () =>
            {
               if(jsx_html.is_valid(p_select))
               {
                  return p_select.jsx_get_value();
               }
               
               return null;
            };
      }
      
      p_select.addEventListener("change",
            (p_event) =>
            {
               jsx_html.check_validity(p_select);
               jsx_html.execute_jsx_on_change(p_select, p_event);
            }
         );
   };


   static enrich_element_any(p_element)
   {
      const name = jsx_html.get_element_name(p_element);
      
      if(name != null)
      {
         switch(name)
         {
            case "SELECT": return jsx_html.enrich_element_input(p_element);
            case "INPUT": return jsx_html.enrich_element_select(p_element);
         }
      }
   }


   static enrich_elements(p_event)
   {
      let elements_to_validate_at_the_end = [];

      const enrich_any_element = (p_element_name, p_callback) =>
      {
         let elements = document.getElementsByTagName(p_element_name);
         Array.from(elements).forEach(
               (p_item) =>
               {
                  p_callback(p_item);
                  elements_to_validate_at_the_end.push(p_item);
               }
            );
      };

      enrich_any_element("select", jsx_html.enrich_element_select);
      enrich_any_element("input", jsx_html.enrich_element_input);
      
      elements_to_validate_at_the_end.forEach(
            (p_element) =>
            {
               jsx_html.check_validity(p_element);
            }
         );
   } // static enrich_elements(p_event)
} // class jsx_html


jsx.on_load_execute(jsx_html.enrich_elements);
