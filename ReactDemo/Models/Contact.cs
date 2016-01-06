using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReactDemo.Models
{
    public class Contact
    {
        [Key]
        public int ContactID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleInitial { get; set; }
        public string Address { get; set; }

        public Contact()
        {

        }

        public Contact(int id, string fName, string lName, string initial, string address)
        {
            this.ContactID = id;
            this.FirstName = fName;
            this.LastName = lName;
            this.MiddleInitial = initial;
            this.Address = address;
        }
    }
}