using ReactDemo.DAL;
using ReactDemo.DAL.Interfaces;
using ReactDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactDemo.Controllers
{
    public class HomeController : Controller
    {
        private IAccountDb contactProvider = new ContactProvider();
        public ActionResult Index()
        {
            List<Contact> allContacts = (List<Contact>)contactProvider.getAllContacts();
            return View("BootstrapIndex",model:allContacts);
        }

        [HttpGet]
        public ActionResult Contacts()
        {
            List<Contact> allContacts = (List<Contact>)contactProvider.getAllContacts();
            return Json(allContacts, JsonRequestBehavior.AllowGet);
        }

        //Create
        [HttpPost]
        public void AddContact(Contact newContact)
        {
            contactProvider.createNewContact(newContact);
        }

        //Read
        [HttpGet]
        public ActionResult getContact(int contactID)
        {
            Contact fetechedContact = contactProvider.readContact(contactID);
            return Json(fetechedContact, JsonRequestBehavior.AllowGet);
        }

        //Update
        [HttpPost]
        public void UpdateContact(Contact editedContact)
        {
            contactProvider.updateContact(editedContact);
        }

        //Delete
        [HttpPost]
        public void DeleteContact(int contactID)
        {
            contactProvider.deleteContact(contactID);
        }
    }
}