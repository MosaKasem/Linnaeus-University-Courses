using System;
using Domain; // use namespace to reference!
using Xunit;
using Moq;


namespace typoonSkriptTTD
{
    public class TestingConsole
    {
        public class FakeConsole : IConsole
        {
            private string fakeinput;
            public FakeConsole(string fakeinput)
            {
                this.fakeinput = fakeinput;
            }
            public string ReadLine()
            {
                return this.fakeinput;
            }
            public void WriteLine(string msg)
            {
                Console.WriteLine(msg);
            }
        }
        private Mock<IConsole> mock_fakeConsole;
        private Mock<ConsoleWrapper> mock_consoleWrapper;
        public void SetUpMockObjects()
        {
            mock_consoleWrapper = new Mock<ConsoleWrapper>();
            mock_fakeConsole = new Mock<IConsole>();
        }
        // cant test the console.. I mean how do you test an implementation that can't be tested unless with this imlementation
/*         [Fact]
        public void VerifyConsoleWrapper()
        {
            SetUpMockObjects();
            var consoleWrapper = new ConsoleWrapper();
            mock_consoleWrapper.Setup(a => a.WriteLine("Zoom"));
            consoleWrapper.WriteLine("Zoom");
            mock_consoleWrapper.Verify(a => a.WriteLine("Zoom"), Times.AtLeastOnce());
        } */
    }
}