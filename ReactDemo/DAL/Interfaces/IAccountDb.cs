using ReactDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactDemo.DAL.Interfaces
{
    interface IAccountDb
    {
        void createNewContact(Contact newContact);
        Contact readContact(int contactId);
        void updateContact(Contact editedContact);
        void deleteContact(int contactId);
        IEnumerable<Contact> getAllContacts();    
    }
}
