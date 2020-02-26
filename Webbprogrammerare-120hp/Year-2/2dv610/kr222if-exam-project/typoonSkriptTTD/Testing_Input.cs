using System;
using Domain; // use namespace to reference!
using Xunit;
using Moq;

namespace typoonSkriptTTD
{
    public class Testing_Input
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
        private Mock<Calculator> mock_c;
        private Mock<CalculatorView> mock_cv;
        private Mock<Input> mock_i;
        public void SetUpMockObjects()
        {
            mock_fakeConsole = new Mock<IConsole>();
            mock_cv = new Mock<CalculatorView>(mock_fakeConsole.Object);
            mock_c = new Mock<Calculator>(mock_fakeConsole.Object, mock_cv.Object);
            mock_i = new Mock<Input>(mock_fakeConsole.Object);
        }
        [Fact]
        public void Exit_Method_Should_Return_True_On_String_Q()
        {
            SetUpMockObjects();
            mock_fakeConsole = new Mock<IConsole>();
            mock_fakeConsole.Setup(s => s.ReadLine()).Returns("Q");
            var input = new Input(mock_fakeConsole.Object);
            Assert.Equal(true, input.Exit());
        }
        [Fact]
        public void Exit_Method_Should_Return_False_On_Other_Than_Q()
        {
            SetUpMockObjects();
            mock_fakeConsole = new Mock<IConsole>();
            mock_fakeConsole.Setup(s => s.ReadLine()).Returns("2255asdQ22555");
            var input = new Input(mock_fakeConsole.Object);
            Assert.Equal(false, input.Exit());
        }
        [Fact]
        public void MakeSureItsRun_Verify()
        {
            SetUpMockObjects();
            mock_i.Setup(s => s.Exit()).Returns(true);
            mock_i.Object.Exit();
            mock_i.Verify(mock => mock.Exit(), Times.AtLeastOnce());
        }
    }
}