cpp_expertise.coder = function()
   {
   };


cpp_expertise.coder.prototype.generate_namespace_begin_if_needed = function(p_state)
   {
      let a = [];
      
      if(p_state.m_namespace != null)
      {
         a.push("namespace ", p_state.m_namespace, " {\n");
         a.push("\n");
      }
      
      return a.join("");
   };


cpp_expertise.coder.prototype.generate_namespace_end_if_needed = function(p_state)
   {
      let a = [];
      
      if(p_state.m_namespace != null)
      {
         a.push("\n");
         a.push("} // namespace ", p_state.m_namespace, "\n");
         a.push("\n");
      }
      
      return a.join("");
   };


cpp_expertise.coder.prototype.generate_class_begin_if_needed = function(p_state)
   {
      let a = [];
      
      if(p_state.m_class_name != null)
      {
         a.push("class ");
         if(p_state.m_import_export_macro && p_state.m_import_export_macro.length > 0)
         {
            a.push(p_state.m_import_export_macro, " ");
         }
         a.push(p_state.m_class_name, "\n");
         a.push("{\n");
      }
      
      return a.join("");
   };


cpp_expertise.coder.prototype.generate_class_end_if_needed = function(p_state)
   {
      let a = [];
      
      if(p_state.m_class_name != null)
      {
         a.push("};\n");
      }
      
      return a.join("");
   };


cpp_expertise.coder.prototype.generate_header = function(p_state)
   {
      let a = [];
      
      a.push(this.generate_namespace_begin_if_needed(p_state));
      a.push(this.generate_class_begin_if_needed(p_state));
      
      if(p_state.m_class_name != null)
      {
         if(p_state.m_class_type == cpp_expertise.k.CLASS_TYPE_VALUE)
         {
            if(p_state.m_is_inlined)
            {
               a.push("public:\n");
               a.push("   ", p_state.m_class_name, "() noexcept = default;\n");
               a.push("   ", p_state.m_class_name, "(const ", p_state.m_class_name, " & ) noexcept = default;\n");
               a.push("   ", p_state.m_class_name, "(", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push("   ", p_state.m_class_name, " & operator = (const ", p_state.m_class_name, " & ) noexcept = default;\n");
               a.push("   ", p_state.m_class_name, " & operator = (", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push("   ~", p_state.m_class_name, "() noexcept = default;\n");
            }
            else
            {
               a.push("public:\n");
               a.push("   ", p_state.m_class_name, "() noexcept;\n");
               a.push("   ", p_state.m_class_name, "(const ", p_state.m_class_name, " & ) noexcept;\n");
               a.push("   ", p_state.m_class_name, "(", p_state.m_class_name, " && ) noexcept;\n");
               a.push("   ", p_state.m_class_name, " & operator = (const ", p_state.m_class_name, " & ) noexcept;\n");
               a.push("   ", p_state.m_class_name, " & operator = (", p_state.m_class_name, " && ) noexcept;\n");
               a.push("   ~", p_state.m_class_name, "() noexcept;\n");
            }
         }
         else if(p_state.m_class_type == cpp_expertise.k.CLASS_TYPE_INTERFACE)
         {
            if(p_state.m_is_inlined)
            {
               a.push("protected:\n");
               a.push("   ", p_state.m_class_name, "() noexcept = default;\n");
               a.push("   ", p_state.m_class_name, "(const ", p_state.m_class_name, " & ) noexcept = default;\n");
               a.push("   ", p_state.m_class_name, "(", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push("   ", p_state.m_class_name, " & operator = (const ", p_state.m_class_name, " & ) noexcept = default;\n");
               a.push("   ", p_state.m_class_name, " & operator = (", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push("public:\n");
               a.push("   virtual ~", p_state.m_class_name, "() noexcept = default;\n");
            }
            else
            {
               a.push("protected:\n");
               a.push("   ", p_state.m_class_name, "() noexcept;\n");
               a.push("   ", p_state.m_class_name, "(const ", p_state.m_class_name, " & ) noexcept;\n");
               a.push("   ", p_state.m_class_name, "(", p_state.m_class_name, " && ) noexcept;\n");
               a.push("   ", p_state.m_class_name, " & operator = (const ", p_state.m_class_name, " & ) noexcept;\n");
               a.push("   ", p_state.m_class_name, " & operator = (", p_state.m_class_name, " && ) noexcept;\n");
               a.push("public:\n");
               a.push("   virtual ~", p_state.m_class_name, "() noexcept;\n");
            }
         }
         else
         {
         }
      }
      
      a.push(this.generate_class_end_if_needed(p_state));
      a.push(this.generate_namespace_end_if_needed(p_state));
      
      return a.join("");
   };


cpp_expertise.coder.prototype.generate_source = function(p_state)
   {
      let a = [];
      
      if(! p_state.m_is_inlined)
      {
         a.push(this.generate_namespace_begin_if_needed(p_state));
         
         
         if(p_state.m_class_name != null)
         {
            if(p_state.m_class_type == cpp_expertise.k.CLASS_TYPE_VALUE)
            {
               a.push(p_state.m_class_name, "::", p_state.m_class_name, "() noexcept = default;\n");
               a.push(p_state.m_class_name, "::", p_state.m_class_name, "(const ", p_state.m_class_name, " & ) noexcept;\n");
               a.push(p_state.m_class_name, "::", p_state.m_class_name, "(", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push(p_state.m_class_name, " & ",  p_state.m_class_name, "::operator = (const ", p_state.m_class_name, " & ) noexcept = default;\n");
               a.push(p_state.m_class_name, " & ", p_state.m_class_name, "::operator = (", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push(p_state.m_class_name, "::~", p_state.m_class_name, "() noexcept = default;\n");
            }
            else if(p_state.m_class_type == cpp_expertise.k.CLASS_TYPE_INTERFACE)
            {
               a.push(p_state.m_class_name, "::", p_state.m_class_name, "() noexcept = default;\n");
               a.push(p_state.m_class_name, "::", p_state.m_class_name, "(const ", p_state.m_class_name, " & ) noexcept;\n");
               a.push(p_state.m_class_name, "::", p_state.m_class_name, "(", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push(p_state.m_class_name, " & ",  p_state.m_class_name, "::operator = (const ", p_state.m_class_name, " & ) noexcept = default;\n");
               a.push(p_state.m_class_name, " & ", p_state.m_class_name, "::operator = (", p_state.m_class_name, " && ) noexcept = default;\n");
               a.push(p_state.m_class_name, "::~", p_state.m_class_name, "() noexcept = default;\n");
            }
            else
            {
            }
         }
         
         a.push(this.generate_namespace_end_if_needed(p_state));
      }
      
      return a.join("");
   };


















