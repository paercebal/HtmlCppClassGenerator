cpp_expertise.explainer = function()
   {
   };


cpp_expertise.explainer.prototype.generate_inlining_choice_explanation = function(p_state)
   {
      let a = [];
      
      a.push("<div class=\"cssQuestion\">");
      a.push("Please choose code implementation style");
      a.push("</div>");

      a.push("<div class=\"cssAnswer\">");
      a.push("<ul>");
      a.push("<li>Code implementation: ");
      a.push( (p_state.m_is_inlined ? "Inlined" : "Non-inlined") );
      a.push("</li>");
      a.push("</ul>");
      a.push("</div>");
      
      a.push("<div class=\"cssComment\">");
      a.push("<details>");
      a.push("<summary>Comment</summary>");
      
      if(p_state.m_is_inlined)
      {
         a.push("<p>Unless the class is templated, this SHOULD NOT be your default choice.</p>");
         a.push("<p>Pros:</p>");
         a.push("<ul>");
         a.push("<li>Performance: Enables inlining across DLLs/shared libraries (The performance gain might be undetectable).</li>");
         a.push("<li>Design: Useful for header-only libraries.</li>");
         a.push("</ul>");
         a.push("<p>Cons:</p>");
         a.push("<ul>");
         a.push("<li>Clutters the header file with code, making it more difficult to read to understand the actual public interface.</li>");
         a.push("<li>The code is compiled multiple times, increasing compilation time.</li>");
         a.push("<li>Increases risks of full recompilation, even for user code that should not care about implementation. This counters incremental build speedups.</li>");
         a.push("</ul>");
      }
      else
      {
         a.push("<p>Unless the class is templated, this SHOULD be your default choice.</p>");
         a.push("<p>Pros:</p>");
         a.push("<ul>");
         a.push("<li>Clearly separates interface and implementation.</li>");
         a.push("<li>As implementation is hidden into source, it will be compiled only once, speeding up builds.</li>");
         a.push("<li>As implementation is hidden into source, implementation changes will not impact other modules, speeding up incremental builds.</li>");
         a.push("<li></li>");
         a.push("<li></li>");
         a.push("</ul>");
         a.push("<p>Cons:</p>");
         a.push("<ul>");
         a.push("<li>If code performance critical, the code won't be inlined.</li>");
         a.push("<li>Code cannot be part of a header-only library.</li>");
         a.push("</ul>");
      }
      
      a.push("</details>");
      a.push("</div>");
      
      return a.join("");
   };


cpp_expertise.explainer.prototype.generate_import_export_macro_explanation = function(p_state)
   {
      let a = [];
      
      a.push("<div class=\"cssQuestion\">");
      a.push("If you want to export your code outside your DLL/shared_object, please enter a name for the macro.");
      a.push("</div>");

      a.push("<div class=\"cssAnswer\">");
      a.push("<ul>");

      if(p_state.m_import_export_macro === null)
      {
         a.push("<li>Invalid macro name</li>");
      }
      else if(p_state.m_import_export_macro.length > 0)
      {
         a.push("<li>Macro name: ", p_state.m_import_export_macro, "</li>");
      }
      else
      {
         a.push("<li>No import/export macro</li>");
      }

      a.push("</ul>");
      a.push("</div>");
      
      return a.join("");
   };



cpp_expertise.explainer.prototype.generate_class_and_namespace_explanation = function(p_state)
   {
      let a = [];
      
      a.push("<div class=\"cssQuestion\">");
      a.push("Please choose type name");
      a.push(" (and optionally a namespace name)");
      a.push("</div>");
      
      if(p_state.m_class_name != null || p_state.m_namespace != null)
      {
         a.push("<div class=\"cssAnswer\">");
         a.push("<ul>");
         if(p_state.m_namespace != null)
         {
            a.push("<li>Namespace: [", p_state.m_namespace, "]</li>");
         }
         if(p_state.m_class_name != null)
         {
            a.push("<li>Class Name: [", p_state.m_class_name, "]</li>");
         }
         a.push("</ul>");
         a.push("</div>");
      }
      
      return a.join("");
   };


cpp_expertise.explainer.prototype.generate_class_type_explanation = function(p_state)
   {
      let a = [];
      
      if(p_state.m_class_name != null)
      {
         a.push("<div class=\"cssQuestion\">");
         a.push("Please choose class type");
         a.push("</div>");
         
         if(p_state.m_class_type == cpp_expertise.k.CLASS_TYPE_VALUE)
         {
            a.push("<div class=\"cssAnswer\">");
            a.push("<ul>");
            a.push("<li>Class Type: [", p_state.m_class_type, "]");
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
         else if(p_state.m_class_type == cpp_expertise.k.CLASS_TYPE_INTERFACE)
         {
            a.push("<div class=\"cssAnswer\">");
            a.push("<ul>");
            a.push("<li>Class Type: [", p_state.m_class_type, "]");
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
      
      return a.join("");
   };


cpp_expertise.explainer.prototype.generate_explanation = function(p_state)
   {
      let a = [];
      
      a.push(this.generate_inlining_choice_explanation(p_state));
      a.push(this.generate_import_export_macro_explanation(p_state));
      a.push(this.generate_class_and_namespace_explanation(p_state));
      a.push(this.generate_class_type_explanation(p_state));
      
      return a.join("");
   };



















