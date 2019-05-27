import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import routesPanel from '../../routesPanel';
import DefaultHeader from './PanelHeader';
import DefaultAside from './PanelAside';
import navigation from '../../_nav';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUser } from './../../actions/authentication';
import {notification} from './../../constants/notification';
import {
    AppAside,
    AppBreadcrumb,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';

class PanelLayout extends Component {

    componentDidMount = () => {
        if(!this.props.auth.isAuthenticated) 
            this.props.history.push('/login');
    }
    
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    onLogout = () => {
        this.props.authUser({});
        notification('warning', 'Hasta luego').show();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader onLogout={this.onLogout} {...this.props}/>
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav navConfig={navigation} {...this.props} />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routesPanel} />
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routesPanel.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => {
                                                    if (props.match.params.id)
                                                        props.id = props.match.params.id;

                                                    return <route.component {...props} />
                                                }} />
                                        ) : (null);
                                    })}
                                    <Redirect from="/" to="/panel/dashboard" />
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                    <AppAside fixed>
                        <Suspense fallback={this.loading()}>
                            <DefaultAside />
                        </Suspense>
                    </AppAside>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.authentication
})
  
export default connect(mapStateToProps, { authUser })(withRouter(PanelLayout));
