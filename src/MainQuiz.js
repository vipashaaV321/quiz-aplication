import React from "react";
import { quizData } from "./quizdata";

class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false
  };

  loadQuizData = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
    if (this.state.myAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1
      });
    }
  };
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h3>Game Over your Final score is {this.state.score} points </h3>
          <div>
            The correct answer's for the questions was
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div class="container pt-5 my-5 ">
            <section class="p-md-3 mx-md-5 text-lg-left">
              <h3>{this.state.questions} </h3>
              <span>{`Questions ${currentQuestion}  out of ${
                quizData.length
              } remaining `}</span>
              <br />
              <br />
              {options.map(option => (
                <p
                  key={option.id}
                  className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
                  onClick={() => this.checkAnswer(option)}
                >
                  {option}
                </p>
              ))}
              {currentQuestion < quizData.length - 1 && (
                <button
                  className="btn btn-primary"
                  disabled={this.state.disabled}
                  onClick={this.nextQuestionHandler}
                >
                  Next
                </button>
              )}
              {/* //adding a finish button */}
              {currentQuestion === quizData.length - 1 && (
                <button
                  className="btn btn-primary"
                  onClick={this.finishHandler}
                >
                  Finish
                </button>
              )}
            </section>
          </div>
        </div>
      );
    }
  }
}

export default MainQuiz;
