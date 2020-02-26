using System;
using Domain; // use namespace to reference!
using Xunit;
using Moq;

namespace typoonSkriptTTD
{

    public class TestCalculator
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
            mock_i = new Mock<Input>();
        }

        [Theory]
        [InlineData(50, 50, 100)]
        [InlineData(50000, 50000, 100000)]
        public void Calculator_Should_Return_Add(double x, double y, double expected)
        {
            SetUpMockObjects();
            var sut = new Calculator(mock_fakeConsole.Object, mock_cv.Object);
            var actual = sut.Add(x, y);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(50, -50, 100)]
        [InlineData(50, -1000, 1050)]
        public void Calculator_Should_Return_Subtract(double x, double y, double expected)
        {
            SetUpMockObjects();
            var sut = new Calculator(mock_fakeConsole.Object, mock_cv.Object);
            var actual = sut.Subtract(x, y);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(2.5, 50.0, 125.0)]
        [InlineData(2.5, 500.0, 1250.0)]
        public void Calculator_Should_Return_Multiply(double x, double y, double expected)
        {
            SetUpMockObjects();
            var sut = new Calculator(mock_fakeConsole.Object, mock_cv.Object);
            var actual = sut.Multiply(x, y);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(0, 5, 0)]
        public void Calculator_Should_Return_Divide(double x, double y, double expected)
        {
            SetUpMockObjects();
            var sut = new Calculator(mock_fakeConsole.Object, mock_cv.Object);
            var actual = sut.Divide(x, y);
            Assert.Equal(expected, actual);
        }

        [Fact] // OLD
        public void Input_Validator_Make_Sure_Throw_Ex()
        {
            SetUpMockObjects();
            var sut = new CalculatorView(mock_fakeConsole.Object);
            var value = "Yellow";
            Assert.Throws<ArgumentException>(() => sut.ReturnValue(value));
        }



        // [Fact]
        // public void ValueShouldAdd4And5() => Values_Should_Calculate_Add(4.0, 5.0, 9.0);

        /*
                [Theory]
                [InlineData(5, 5, 3125)]
                [InlineData(5, 10, 9765625)]
                public void Value_Should_Calculate_Elevated(double x, double y, double expected)
                {
                    var iCalculatorMock = new Mock<ICalculator>();
                    iCalculatorMock.Setup(s => s.Elevated(x, y)).Returns(() => Math.Pow(x, y));
                    var sut = new Calculator(x, y);
                    var actual = sut.Elevate(iCalculatorMock.Object, x, y);

                    Assert.Equal(expected, actual);
                }*/
        /*         [Fact]
                public void Value_Should_Calculate()
                {
                    //Given
                    var mochObj = new Mock<Random>();
                    var randomNumber = mochObj.Setup(r => r.Next(1, 100)).Returns(2);

                    var sut = new Calculator();
                    // var value = sut.Multiply(mochObj.Object);
                    mochObj.Verify(random => random.Next(It.IsAny<int>(), It.IsAny<int>()), Times.AtLeastOnce());
                    //When

                    //Then
                } 

                        [Fact]
                public void Value_Should_Calculate_With_Mock_Obj()
                {

                    var mochObj = new Mock<Random>();
                    var randomNumber = mochObj.Setup(r => r.Next(1, 100)).Returns(2);
                }
                */
    }
}
