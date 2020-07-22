import React from 'react'
import {Cards, Chart, CountryPicker} from './components'
import './App.module.css'
import {fetchData} from '../src/api'

import covidLogo from './images/covid.png'

class App extends React.Component{

    state ={
        data:{},
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData()

        this.setState({data: fetchedData});
    }

    handleCoutryChange = async (country) => {
      const fetchedData = await fetchData(country);

      this.setState({ data: fetchedData , country: country});

    }

    render(){
        const {data , country} = this.state
        return (
          <div className="app_container">
            <img src={covidLogo} className='image' alt='covid' />
            <Cards data={data} />
            <CountryPicker handleCoutryChange={this.handleCoutryChange}/>
            <Chart data={data} country={country}/>
          </div>
        );
    }
}
export default App