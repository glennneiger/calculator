import { Component, OnInit, NgModule } from "@angular/core";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.css"]
})
export class CalculatorComponent implements OnInit {
  numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  operators = ["*", "/", "+", "-"];

  expression: string = "";
  display: string = "0";
  number: string = "";
  operator: string = "";
  prevNumber: string = null;

  evaluate() {
    console.log(this.operator === "");
    if (this.expression.length > 0 && this.operator === "") {
      this.expression = this.expression + this.number;
      console.log(this.expression);
      this.display = String(eval(this.expression) || 0);
      this.expression = "";
      this.number = "";
      this.prevNumber = this.display;
    }
  }

  clear() {
    this.expression = "";
    this.display = "0";
    this.number = "";
    this.prevNumber = null;
  }

  negate() {
    const opposite = String(Number(this.number) * -1);
    if (this.number.length > 0) {
      if (this.number[0] === "(") {
        this.number = this.number.slice(2, this.number.length - 1);
      } else {
        this.number = "(-" + this.number + ")";
      }
    } else if (this.prevNumber !== null) {
      this.prevNumber = String(Number(this.prevNumber) * -1);
    }
    this.display =
      this.number[0] === "("
        ? this.number.slice(1, this.number.length - 1)
        : this.number === ""
          ? "0"
          : this.number;
  }

  getPercent() {
    if (this.number.length > 0) {
      this.number = String(Number(this.number) / 100.0);
    } else if (this.prevNumber !== null) {
      this.prevNumber = String(Number(this.prevNumber) / 100.0);
    }
    this.display = this.number === "" ? "0" : this.number;
  }

  getDecimal() {
    if (!this.expression.includes(".") && !this.number.includes(".")) {
      this.number = this.number === "" ? "0." : this.number + ".";
      this.display = this.number;
    }
  }

  clickNum(e) {
    this.display = "";
    const num = document.getElementById(e.target.id).textContent;
    this.number = this.number + num;
    this.display = this.number;
    if (this.operator.length > 0) {
      this.expression = this.expression + this.operator;
      this.operator = "";
    }
  }

  clickOperator(e) {
    const operator = document.getElementById(e.target.id).textContent;
    console.log(operator);
    if (this.number.length > 0) {
      this.expression = this.expression + this.number;
      this.operator = operator;
      this.number = "";
    } else if (!!this.prevNumber) {
      this.expression = this.prevNumber + operator;
    }
  }

  constructor() {}

  ngOnInit() {}
}
