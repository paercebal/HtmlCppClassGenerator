const hccg = {};
hccg.elements_enricher = {};
hccg.validity = {};

hccg.validity.is_symbol_name = (p_text) =>
   {
      if(p_text.length == 0) return null;
      return jsx_regex.is_exactly(p_text, "[A-Za-z](?:[A-Za-z0-9_])*");
   }

hccg.validity.is_non_empty_symbol_name = (p_text) =>
   {
      if(p_text.length == 0) return false;
      return hccg.validity.is_symbol_name(p_text);
   }

hccg.validity.is_symbol_namespaces = (p_text) =>
   {
      if(p_text.length == 0) return null;
      let a = p_text.split("::");
      for(let s of a)
      {
         if(! hccg.validity.is_symbol_name(s))
         {
            return false;
         }
      }
      
      return true;
   };

hccg.validity.is_non_empty_selection = (p_text) =>
   {
      return (p_text.length != 0);
   }


hccg.elements_enricher.on_select_change = (p_select, p_event) =>
   {
      let o = p_select;
      //jsx.log("select[", o.id, "] changed");
      //jsx.log(" - index: ", o.jsx_get_selected_index());
      //jsx.log(" - value: \"", o.jsx_get_value(), "\"");
      
      if(o.id === "ID_select_type2")
      {
         //jsx.id("ID_select_type").jsx_set_value(o.jsx_get_value());
      }
      
      //hccg.update_output();
      hccg.g_to_be_updated = true;
   };

hccg.elements_enricher.on_input_change = (p_input, p_event) =>
   {
      let o = p_input;
      //jsx.log("input[", o.id, "] changed");
      //jsx.log(" - value: \"", o.jsx_get_value(), "\"");

      //hccg.update_output();
      hccg.g_to_be_updated = true;
   }

hccg.g_to_be_updated = true;

hccg.on_change = (p_element, p_event) =>
   {
      hccg.g_to_be_updated = true;
   };

hccg.update_output = () =>
   {
      if(hccg.g_to_be_updated === null) {}
      else if(hccg.g_to_be_updated) {}
      else { return; }
      
      hccg.g_to_be_updated = null;
      
      const state = new cpp_expertise.state();

      state.m_namespace = jsx.id("ID_input_namespace").jsx_get_value_if_valid();
      state.m_class_name = jsx.id("ID_input_name").jsx_get_value_if_valid();
      state.m_class_type = jsx.id("ID_select_type").jsx_get_value_if_valid();
      
      jsx.id("ID_output_header").value = state.generate_header();
      jsx.id("ID_output_source").value = state.generate_source();
      jsx.id("ID_output_explanation").innerHTML = state.generate_explanation();

      if(hccg.g_to_be_updated === null)
      {
         hccg.g_to_be_updated = false;
      }
   }


jsx.on_load_execute(
      (p_event) =>
      {
         //jsx_html.enrich_elements(p_event, hccg.elements_enricher);
         jsx.set_timer_task(hccg.update_output, 1250);
      }
   );



//