import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import Search from './components/Search'
import ScrollToTop from './components/ScrollTop'
import TestPage from './components/TestPage'
import TestPage2 from './components/TestPage2'
import AddPage from './components/Add'

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/search' component={Search} />
                <Route path='/testpage' component={TestPage} />
                <Route path='/testpage2' component={TestPage2} />
                <Route path='/add' component={AddPage} />
            </Switch>
        </ScrollToTop>
    </HashRouter>
)