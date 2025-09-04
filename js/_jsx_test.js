class jsx_test_assert_happened_exception_data
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
} // class jsx_test_assert_happened_exception_data


class jsx_test_assert_happened_exception extends jsx_error
{
   filtered_stack()
   {
      let a = this.parsed_stack();
      return a.filter((o) =>
         {
            if(o.m_function.startsWith("jsx_test_assert_happened_exception") ||
               o.m_function.startsWith("ASSERT_") ||
               o.m_function.startsWith("EXPECT_") ||
               o.m_function.startsWith("DO_REACT_") ||
               o.m_function.startsWith("DO_TEST_"))
            {
               return false;
            }

            return true;
         });
   }
   
   toString()
   {
      return "jsx_error: " + this.message + "\n" + this.filtered_stack().join("\n");
   }
} // class jsx_test_assert_happened_exception


class jsx_test
{
   constructor()
   {
      this.t_empty     = "";
      this.t_sep_equal = "[==========]";
      this.t_run       = "[ RUN      ]";
      this.t_ok        = "[       OK ]";
      this.t_error     = "[    ERROR ]";
      this.t_passed    = "[  PASSED  ]";
      this.t_failed    = "[  FAILED  ]";
      this.t_message   = "[  MESSAGE ]";
      
      this.clear();
   }
   
   clear()
   {
      this.m_element_ids = [];
      this.m_test_count = 0;
      this.m_test_success_count = 0;
      this.m_test_failure_count = 0;
      this.m_temp_test_success = true;
      
      this.m_failures = [];
      
      this.m_PRIVATE_log_private_already_failed = false;
   }

   log_private(p_preamble, p_line_of_text)
   {
      const preamble_space = (!p_preamble || !p_preamble.length) ? "" :  " ";
      
      let self = this;
      
      let preamble_as_html = function()
      {
         switch(p_preamble)
         {
            case self.t_sep_equal:
            case self.t_run:
            case self.t_ok:
            case self.t_passed:
               return "<span class=\"cssJsxTestGreen\">" + p_preamble + "</span>";
            case self.t_error:
            case self.t_failed:
               return "<span class=\"cssJsxTestRed\">" + p_preamble + "</span>";
            case self.t_message:
               return "<span class=\"cssJsxTestMagenta\">" + p_preamble + "</span>";
            default:
               return p_preamble;
         }
      };
      
      for(let element_id of this.m_element_ids)
      {
         let e = document.getElementById(element_id);
         
         if(!e)
         {
            if(! this.m_PRIVATE_log_private_already_failed)
            {
               alert("Unable to log because element [" + e + "] is null or undefined");
               this.m_PRIVATE_log_private_already_failed = true;
            }
         }
         else if(e.nodeName === "TEXTAREA")
         {
            e.value += p_preamble + preamble_space + p_line_of_text + "\n";
         }
         else if(e.nodeName === "DIV")
         {
            e.innerHTML += preamble_as_html() + preamble_space + p_line_of_text + "<br />";
         }
         else
         {
            if(! this.m_PRIVATE_log_private_already_failed)
            {
               alert("Unable to log because element [" + e + "] is not recognized");
               this.m_PRIVATE_log_private_already_failed = true;
            }
         }
      }
   }
   
   log(p_preamble, ...p_args)
   {
      let s = p_args.join("");
      
      if(p_preamble == this.t_error)
      {
         this.m_failures.push([p_preamble, s]);
      }
      
      this.log_private(p_preamble, s);
   };

   log_message(...p_args)
   {
      this.log(this.t_message, ...p_args);
   }

   log_failures()
   {
      for(let item of this.m_failures)
      {
         this.log_private(item[0], item[1]);
      }
   }
   
   launch(...p_args_element_id)
   {
      this.clear();
      this.m_element_ids = p_args_element_id;
      
      let fs = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
                     .filter( (p_item) => p_item.startsWith("test_") );

      this.log(this.t_sep_equal, "Running ", fs.length
                  , " tests from test suite ", this.constructor.name);

      for(let item of fs)
      {
         this.log(this.t_run, this.constructor.name, ".", item);
         
         try
         {
            this.m_temp_test_success = true;
            
            try
            {
               this[item]();
            }
            catch(e)
            {
               if(e instanceof jsx_test_assert_happened_exception)
               {
                  this.m_temp_test_success = false;
                  let a = [];
                  a.push("Error!");
                  a.push("\n");
                  a.push(e.message);
                  //a.push(e.stack);
                  a.push(e.filtered_stack().join("\n"));
                  a.push("\n");
                  this.log(this.t_empty, a.join(""));
               }
               else
               {
                  throw e;
               }
            }
         
            if(this.m_temp_test_success)
            {
               this.log(this.t_ok, this.constructor.name, ".", item);
            }
            else
            {
               this.log(this.t_error, this.constructor.name, ".", item);
            }
         }
         catch(e)
         {
            this.m_temp_test_success = false;
            if(e instanceof jsx_error)
            {
               this.log(this.t_error, "Exception thrown : ", e);
            }
            else
            {
               this.log(this.t_error, "Exception thrown : ", jsx_error.to_string(e));
            }
         }
         
         ++this.m_test_count;
         if(this.m_temp_test_success)
         {
            ++this.m_test_success_count;
         }
         else
         {
            ++this.m_test_failure_count;
         }
      }

      this.log(this.t_sep_equal, this.m_test_count, " tests from "
               , fs.length, " tests of the test suite "
               , this.constructor.name, " ran.");

      this.log(this.t_passed, this.m_test_success_count, " tests.");
      
      if(this.m_test_failure_count > 0)
      {
         this.log(this.t_failed, this.m_test_failure_count, " tests.");
         this.log_failures();
      }

      this.log(this.t_empty, "");
   }
   
   ////////////////////////////////////////////////////////

   PRINT_value(p_value)
   {
      return p_value + "";
   }
   
   DO_REACT_throw_assert_happened(p_message)
   {
      this.m_temp_test_success = false;
      throw new jsx_test_assert_happened_exception(p_message + "\n");
   }

   DO_REACT_log_expect_happened(p_message)
   {
      let e = new jsx_test_assert_happened_exception("");
      this.m_temp_test_success = false;
      let a = [];
      a.push("Error!");
      a.push("\n");
      a.push(p_message);
      a.push("\n");
      a.push(e.filtered_stack().join("\n"));
      a.push("\n");
      this.log(this.t_empty, a.join(""));
   }

   ////////////////////////////////////////////////////////

   DO_TEST_EQ(p_lhs, p_rhs, p_reaction_lambda)
   {
      if(p_lhs === p_rhs)
      {
      }
      else
      {
         let a = [];
         a.push("p_lhs == p_rhs is false\n");
         a.push(" - p_lhs : [", this.PRINT_value(p_lhs), "]\n");
         a.push(" - p_rhs : [", this.PRINT_value(p_rhs), "]\n");
         p_reaction_lambda(this, a.join(""));
      }
   }

   ASSERT_EQ(p_lhs, p_rhs)
   {
      this.DO_TEST_EQ(p_lhs, p_rhs, (p_self, p_text) =>
         {
            p_self.DO_REACT_throw_assert_happened(p_text);
         });
   }
   
   EXPECT_EQ(p_lhs, p_rhs)
   {
      this.DO_TEST_EQ(p_lhs, p_rhs, (p_self, p_text) =>
         {
            p_self.DO_REACT_log_expect_happened(p_text);
         });
   }

   ////////////////////////////////////////////////////////

   DO_TEST_THROWN(p_throwing_lambda, p_reaction_lambda)
   {
      let is_thrown = false;
      try
      {
         p_throwing_lambda();
      }
      catch(e)
      {
         is_thrown = true;
      }
      
      if(is_thrown)
      {
      }
      else
      {
         let a = [];
         a.push("Expected an exception to be thrown, and yet, none were thrown");
         p_reaction_lambda(this, a.join(""));
      }
   }

   ASSERT_THROWN(p_throwing_lambda)
   {
      this.DO_TEST_THROWN(p_throwing_lambda, (p_self, p_text) =>
         {
            p_self.DO_REACT_throw_assert_happened(p_text);
         });
   }

   EXPECT_THROWN(p_throwing_lambda)
   {
      this.DO_TEST_THROWN(p_throwing_lambda, (p_self, p_text) =>
         {
            p_self.DO_REACT_log_expect_happened(p_text);
         });
   }
   
} // class jtest
