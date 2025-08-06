const jsx = {};
jsx.html = {};
jsx.html.select = {};

jsx.any_to_string = (p_any) =>
   {
      if(p_any === undefined) return "<undefined>";
      if(p_any === null) return "<null>";
      return p_any.toString();
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

jsx.html.assert_element = (p_id_or_element, p_name) =>
   {
      if(p_id_or_element instanceof HTMLElement)
      {
         let o = p_id_or_element;

         if(o.tagName != p_name)
         {
            jsx.log_error("jsx.html.assert_element(\"", o.id, "\", \"", p_name, "\") HTML element \"", o.id, "\" is not a \"", p_name, "\". It's a \"", o.tagName, "\".");
         }
         
         return;
      }
      else if(typeof p_id_or_element === "string")
      {
         let p_id = p_id_or_element;
         if(jsx.id(p_id).tagName != p_name)
         {
            jsx.log_error("jsx.html.assert_element(\"", p_id, "\", \"", p_name, "\") HTML element \"", p_id, "\" is not a \"", p_name, "\". It's a \"", jsx.id(p_id).tagName, "\".");
         }
         
         return;
      }
   };


jsx.html.enrich_elements = (p_event, p_elements_enricher) =>
   {
      const enrich_input = (p_input) =>
      {
         jsx.html.assert_element(p_input.getAttribute("id"), "INPUT");

         p_input.jsx_get_value = () =>
            {
               return p_input.value;
            };

         p_input.jsx_set_value = (p_value) =>
            {
               p_input.value = p_value;
            };

         p_input.addEventListener("change",
               (p_event) =>
               {
                  p_elements_enricher.on_input_change(p_input, p_event);
               }
            );

         p_input.addEventListener("keyup",
               (p_event) =>
               {
                  p_elements_enricher.on_input_change(p_input, p_event);
               }
            );
      }
      
      const enrich_select = (p_select) =>
      {
         jsx.html.assert_element(p_select.getAttribute("id"), "SELECT");

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
         }
         
         p_select.addEventListener("change",
               (p_event) =>
               {
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
   };

