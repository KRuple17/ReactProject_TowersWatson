using System;
using NUnit.Framework;
using ReactDemo.DAL;

namespace UnitTest1
{
    [TestFixture]
    public class UnitTest1
    {
        [Test]
        public void TestMethod1()
        {
            Assert.True(true);
        }

        [SetUp]
        public void setup()
        {

        }

        [TestCase]
        public void test2()
        {
            ContactProvider c = new ContactProvider();
            Assert.NotNull(c);
        }
    }
}
