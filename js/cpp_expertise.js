const cpp_expertise = {};

cpp_expertise.k = {};

cpp_expertise.k.CODE_IMPLEMENTATION_NON_INLINED = "NON_INLINED";
cpp_expertise.k.CODE_IMPLEMENTATION_INLINED = "INLINED";

cpp_expertise.k.CLASS_TYPE_INTERFACE = "INTERFACE";
cpp_expertise.k.CLASS_TYPE_VALUE = "VALUE";

cpp_expertise.state = function()
   {
      this.m_is_inlined = false;
      this.m_import_export_macro = "";
      this.m_namespace = "";
      this.m_class_name = "";
      this.m_class_type = "";
   };














