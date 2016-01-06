using System;
using NUnit.Framework;
using ReactDemo.DAL;

namespace UnitTest1
{
    [TestFixture]
    public class UnitTest1
    {
        private ContactProvider contactDbProvider = null;
        [Test]
        public void TestMethod1()
        {
            Assert.True(true);
        }

        [SetUp]
        public void setup()
        {
            contactDbProvider = new ContactProvider();
        }

        [Test]
        public void TestGetAllContact()
        {
           var resultList= contactDbProvider.getAllContacts();
            Assert.NotNull(resultList);
        }

        [Test]
        public void TestContactRead()
        {
            var fetchedContact = contactDbProvider.readContact(3);
            Assert.NotNull(fetchedContact);
        }

        [Test]
        public void BreakReadContact()
        {
            var fetchedContact = contactDbProvider.readContact(0);
            Assert.Null(fetchedContact);
        }
    }
}
