// @ts-nocheck
import React, { Component } from 'react';
//inheritance parentclass state-property method
class Test extends Component {  // boyitilgan class
    constructor(props) {
        /** Meros olgan komponentning constructorini amalga oshirayotganda, 
         * React.Component boshqa bayonotlardan oldin super(props)ni call qilish kerak . 
         * Aks holda this.props, constructor ichida aniqlanmagan bo'ladi, bu esa xatolarga olib keladi. */
      super(props);    
      this.state = { //Test classning statesi mavjud render qilishda faol foydalanamz
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964,
      };
    }

    changeDetail = () => { //buton bosilsa shu ishga tushsin
      this.setState({      // datalar korinsin
        color: "blue", 
        brand: "Tesla", 
        model: "Model S", 
        year: 2023, 
    });
    };
/** Lifecycle methodi 3 hili bor methodi / buni reactni fazalari deyishadi fazalarni o'zini ishga tushish vaqti bo'ladi
 1-  componentDidMount = Moutin: birinchi renderda  ishga tushadi. backentdan datani olish un
 2-  componentWillUnmount = UnMouting: boshqa pagega o'tayotganda bu page yashirilishidan oldin ishga tushadi
 3-  componentDidUpdate = Updating: []-array dependensy  */

    componentDidMount() { // asosiysi yani backentdan datani olish un frontend quriliishi un
        console.log("componentDidMount"); //ishga tushganini browserda ko'rish uchun
        // rounts after first render => RETRIEVE DATA FROM BACKEND SERVER(birinchi renderda ishga tushadi)
    }

    componentWillUnmount() { // o'sha page yashirilishdan oldin malum aperatsiyani qilsh kerak bo'lsa shu kerak
        console.log("componentWillUnmount");
        // rounts before component unmount (ko'z-o'ngdan olinayotgan vaqtda ishga tushadi)
    }

    componentDidUpdate() {} //array dependensy[] biz biriktrgan datani o'zgartish vaqtida


    render() { //render orqali viewni hosil qilib return qilyapmiz
      return (
        <div>
          <h1>My {this.state.brand}</h1>  {/* stateni icidagi brandini pass qilamz */}
          <p>
            Color: {this.state.color} - Model: {this.state.model} from{" "} {/* from  orasida joy tashlab beradi */}
            {this.state.year}.
          </p>
          <button
            type="button" onClick={this.changeDetail}>
                Change Detail
            </button>
        </div>
      );
    }
  }

export default Test;