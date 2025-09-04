const cpp_expertise = {};

cpp_expertise.k = {};

cpp_expertise.k.CLASS_TYPE_INTERFACE = "INTERFACE";
cpp_expertise.k.CLASS_TYPE_VALUE = "VALUE";


cpp_expertise.state = function()
   {
      this.m_namespace = "";
      this.m_class_name = "";
      this.m_class_type = "";
   };


cpp_expertise.state.prototype.generate_header = function()
   {
      let a = [];
      
      if(this.m_namespace != null)
      {
         a.push("namespace ", this.m_namespace, " {\n");
         a.push("\n");
      }
      
      if(this.m_class_name != null)
      {
         if(this.m_class_type == "VALUE")
         {
            a.push("class ", this.m_class_name, "\n");
            a.push("{\n");
            
            a.push("public:\n");
            a.push("   ", this.m_class_name, "() noexcept = default;\n");
            a.push("   ", this.m_class_name, "(const ", this.m_class_name, " & ) noexcept = default;\n");
            a.push("   ", this.m_class_name, "(", this.m_class_name, " && ) noexcept = default;\n");
            a.push("   ", this.m_class_name, " & operator = (const ", this.m_class_name, " & ) noexcept = default;\n");
            a.push("   ", this.m_class_name, " & operator = (", this.m_class_name, " && ) noexcept = default;\n");
            a.push("   ~", this.m_class_name, "() noexcept = default;\n");

            a.push("};\n");
            a.push("\n");
         }
         else if(this.m_class_type == "INTERFACE")
         {
            a.push("class ", this.m_class_name, "\n");
            a.push("{\n");
            
            a.push("protected:\n");
            a.push("   ", this.m_class_name, "() noexcept = default;\n");
            a.push("   ", this.m_class_name, "(const ", this.m_class_name, " & ) noexcept = default;\n");
            a.push("   ", this.m_class_name, "(", this.m_class_name, " && ) noexcept = default;\n");
            a.push("   ", this.m_class_name, " & operator = (const ", this.m_class_name, " & ) noexcept = default;\n");
            a.push("   ", this.m_class_name, " & operator = (", this.m_class_name, " && ) noexcept = default;\n");
            a.push("public:\n");
            a.push("   virtual ~", this.m_class_name, "() noexcept = default;\n");
            
            a.push("};\n");
            a.push("\n");
         }
         else
         {
         }
      }
      
      if(this.m_namespace != null)
      {
         a.push("} // namespace ", this.m_namespace, "\n");
         a.push("\n");
      }
      
      return a.join("");
   };


cpp_expertise.state.prototype.generate_source = function()
   {
      let a = [];
      
      if(this.m_namespace != null)
      {
         a.push("namespace ", this.m_namespace, " {\n");
         a.push("\n");
      }
      
      
      if(this.m_namespace != null)
      {
         a.push("} // namespace ", this.m_namespace, "\n");
         a.push("\n");
      }
      
      return a.join("");
   };




cpp_expertise.state.prototype.generate_explanation = function()
   {
      let a = [];
      
      a.push("<div class=\"cssQuestion\">");
      a.push("Please choose type name");
      a.push(" (and optionally a namespace name)");
      a.push("</div>");
      
      if(this.m_class_name != null || this.m_namespace != null)
      {
         a.push("<div class=\"cssAnswer\">");
         a.push("<ul>");
         if(this.m_namespace != null)
         {
            a.push("<li>Namespace: [", this.m_namespace, "]");
         }
         if(this.m_class_name != null)
         {
            a.push("<li>Class Name: [", this.m_class_name, "]");
         }
         a.push("</ul>");
         a.push("</div>");
      }
      
      if(this.m_class_name != null)
      {
         a.push("<div class=\"cssQuestion\">");
         a.push("Please choose class type");
         a.push("</div>");
         
         if(this.m_class_type == "VALUE")
         {
            a.push("<div class=\"cssAnswer\">");
            a.push("<ul>");
            a.push("<li>Class Type: [", this.m_class_type, "]");
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
         else if(this.m_class_type == "INTERFACE")
         {
            a.push("<div class=\"cssAnswer\">");
            a.push("<ul>");
            a.push("<li>Class Type: [", this.m_class_type, "]");
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



















