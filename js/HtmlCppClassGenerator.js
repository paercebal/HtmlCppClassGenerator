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
      
      const namespace = jsx.id("ID_input_namespace").jsx_get_value_if_valid();
      const name = jsx.id("ID_input_name").jsx_get_value_if_valid();
      const type = jsx.id("ID_select_type").jsx_get_value();
      
      {
         let a = [];
         
         if(namespace != null)
         {
            a.push("namespace ", namespace, " {\n");
            a.push("\n");
         }
         
         if(name != null)
         {
            if(type == "VALUE")
            {
               a.push("class ", name, "\n");
               a.push("{\n");
               
               a.push("public:\n");
               a.push("   ", name, "() noexcept = default;\n");
               a.push("   ", name, "(const ", name, " & ) noexcept = default;\n");
               a.push("   ", name, "(", name, " && ) noexcept = default;\n");
               a.push("   ", name, " & operator = (const ", name, " & ) noexcept = default;\n");
               a.push("   ", name, " & operator = (", name, " && ) noexcept = default;\n");
               a.push("   ~", name, "() noexcept = default;\n");

               a.push("};\n");
               a.push("\n");
            }
            else if(type == "INTERFACE")
            {
               a.push("class ", name, "\n");
               a.push("{\n");
               
               a.push("protected:\n");
               a.push("   ", name, "() noexcept = default;\n");
               a.push("   ", name, "(const ", name, " & ) noexcept = default;\n");
               a.push("   ", name, "(", name, " && ) noexcept = default;\n");
               a.push("   ", name, " & operator = (const ", name, " & ) noexcept = default;\n");
               a.push("   ", name, " & operator = (", name, " && ) noexcept = default;\n");
               a.push("public:\n");
               a.push("   virtual ~", name, "() noexcept = default;\n");
               
               a.push("};\n");
               a.push("\n");
            }
            else
            {
            }
         }
         
         if(namespace != null)
         {
            a.push("} // namespace ", namespace, "\n");
            a.push("\n");
         }
         
         jsx.id("ID_output_header").value = a.join("");
      }
      
      {
         let a = [];
         jsx.id("ID_output_source").value = a.join("");
      }
      
      {
         let a = [];
         
         a.push("<div class=\"cssQuestion\">");
         a.push("Please choose type name");
         a.push(" (and optionally a namespace name)");
         a.push("</div>");
         
         if(name != null || namespace != null)
         {
            a.push("<div class=\"cssAnswer\">");
            a.push("<ul>");
            if(namespace != null)
            {
               a.push("<li>Namespace: [", namespace, "]");
            }
            if(name != null)
            {
               a.push("<li>Class Name: [", name, "]");
            }
            a.push("</ul>");
            a.push("</div>");
         }
         
         if(name != null)
         {
            a.push("<div class=\"cssQuestion\">");
            a.push("Please choose class type");
            a.push("</div>");
            
            if(type == "VALUE")
            {
               a.push("<div class=\"cssAnswer\">");
               a.push("<ul>");
               a.push("<li>Class Type: [", type, "]");
               a.push("</ul>");
               a.push("</div>");
               
               a.push("<div class=\"cssComment\">");
               a.push("<details>");
               a.push("<summary>Comment</summary>");
               a.push("<p>");
               a.push("A \"value\" is a class that behaves like");
               a.push(" a builtin (e.g. an int):");
               a.push("</p>");
               a.push("<p>");
               a.push("It is mandatory that can be copied,");
               a.push(" moved, default-constructed.");
               a.push(" and of course, destroyed. They can");
               a.push("</p>");
               a.push("<p>");
               a.push("As such, they can");
               a.push(" can be directly used as items in a STL");
               a.push(" container.");
               a.push("</p>");
               a.push("<p>");
               a.push("As values, they might also support");
               a.push(" comparisons (see later).");
               a.push("</p>");
               a.push("<p>");
               a.push("Examples of \"value\" classes are:");
               a.push("</p>");
               a.push("<ul>");
               a.push("<li>bool");
               a.push("<li>std::string");
               a.push("<li>std::vector&lt;T&gt;");
               a.push("</ul>");
               a.push("<p>");
               a.push("References:");
               a.push("</p>");
               a.push("<ul>");
               a.push("<li>...</li>");
               a.push("<li>...</li>");
               a.push("</ul>");
               a.push("</details>");
               a.push("</div>");
            }
            else if(type == "INTERFACE")
            {
               a.push("<div class=\"cssAnswer\">");
               a.push("<ul>");
               a.push("<li>Class Type: [", type, "]");
               a.push("</ul>");
               a.push("</div>");

               a.push("<div class=\"cssComment\">");
               a.push("<details>");
               a.push("<summary>Comment</summary>");
               a.push("<p>");
               a.push("An \"interface\" is a class that:");
               a.push(" declares a contract through virtual");
               a.push(" member functions.");
               a.push("</p>");
               a.push("<p>");
               a.push("As such, it should respect the following");
               a.push(" constraints:");
               a.push("</p>");
               a.push("<ul>");
               a.push("<li>Forbid copy and move by the user through a reference to that interface.</li>");
               a.push("<li>Forbid construction of that interface by the user through any constructor</li>");
               a.push("<li>Enable destruction through a pointer to that interface</li>");
               a.push("<li>Enable any class to inherit from it without any ill-effect but the potential need to define the pure virtual member functions of the interface.</li>");
               a.push("<li>Have not state whatsoever (i.e. no member variable)</li>");
               a.push("</ul>");
               a.push("<p>");
               a.push("To avoid problems related to multiple inheritance, it is advisable to inherit virtually from an interface.");
               a.push("</p>");
               a.push("<p>");
               a.push("Here, this is done by declare all special");
               a.push("member functions (default, copy and move constructors, plus copy and move assignment) protected, noexcept and default, expect for the destructor, which is virtual, public default and noexcept.");
               a.push("</p>");
               a.push("<p>");
               a.push("An advanced version of the raw interface");
               a.push(" is the NVI (Non-virtual Interface)");
               a.push(" pattern.");
               a.push("</p>");
               a.push("<p>");
               a.push("They can be copied, moved, default-constructed");
               a.push(" and of course, destroyed. They can");
               a.push(" can be directly used as items in a STL");
               a.push(" container.");
               a.push("</p>");
               a.push("<p>");
               a.push("Examples of \"value\" class are:");
               a.push("</p>");
               a.push("<ul>");
               a.push("<li>bool</li>");
               a.push("<li>std::string</li>");
               a.push("<li>std::vector&lt;T&gt;</li>");
               a.push("</ul>");
               a.push("<p>");
               a.push("References:");
               a.push("</p>");
               a.push("<ul>");
               a.push("<li>...</li>");
               a.push("<li>...</li>");
               a.push("</ul>");
               a.push("</details>");
               a.push("</div>");
            }
            else
            {
            }
         }
         
         jsx.id("ID_output_explanation").innerHTML = a.join("");
      }

      if(hccg.g_to_be_updated === null)
      {
         hccg.g_to_be_updated = false;
      }
      
      //jsx.log("Yo: " + hccg.g_to_be_updated);
   }


jsx.on_load_execute(
      (p_event) =>
      {
         //jsx_html.enrich_elements(p_event, hccg.elements_enricher);
         jsx.set_timer_task(hccg.update_output, 1250);
      }
   );



//