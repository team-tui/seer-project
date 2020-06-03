import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'
import TestPage2 from './components/TestPage2'
import AddPage from './components/Add'

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/testpage2' component={TestPage2} />
                <Route path='/add' component={AddPage} />
            </Switch>
        </ScrollToTop>
    </HashRouter>
)