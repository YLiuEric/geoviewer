/* Written by Ye Liu */

import React from 'react';

import { Icon } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';

import emitter from '@utils/events.utils';
import '@styles/menu.style.css';

const styles = {
    root: {
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 1000
    },
    fontIcon: {
        color: 'white'
    }
};

class Menu extends React.Component {
    state = {
        open: false,
        actions: [
            {
                name: 'Report a bug',
                icon: <Icon style={styles.fontIcon}>bug_report</Icon>,
                color: 'green',
                callback: () => {
                    window.open('https://github.com/yeliudev/geoviewer/issues/new');
                    this.handleClose();
                }
            },
            {
                name: 'Edit data',
                icon: <Icon style={styles.fontIcon}>insert_chart</Icon>,
                color: 'blue',
                callback: () => {
                    emitter.emit('closeAllController');
                    emitter.emit('openDataController');
                    this.handleClose();
                }
            },
            {
                name: 'Configure layers',
                icon: <Icon style={styles.fontIcon}>layers</Icon>,
                color: 'yellow darken-1',
                callback: () => {
                    emitter.emit('closeAllController');
                    emitter.emit('openLayerController');
                    this.handleClose();
                }
            },
            {
                name: 'Switch style',
                icon: <Icon style={styles.fontIcon}>brush</Icon>,
                color: 'red accent-2',
                callback: () => {
                    emitter.emit('closeAllController');
                    emitter.emit('openStyleController');
                    this.handleClose();
                }
            }
        ]
    }

    handleClick = () => {
        this.setState(state => ({
            open: !state.open
        }));
    }

    handleOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    componentDidMount() {
        // Set anchor id
        document.getElementsByClassName('MuiSpeedDial-fab')[0].setAttribute('id', 'menu');

        // Bind event listener
        this.openMenuListener = emitter.addListener('openMenu', () => {
            this.setState({
                open: true
            });
        });

        // Display feature
        setTimeout(() => {
            emitter.emit('displayFeature');
        }, 800);
    }

    componentWillUnmount() {
        // Remove event listener
        emitter.removeListener(this.openMenuListener);
    }

    render() {
        return (
            <SpeedDial
                style={styles.root}
                open={this.state.open}
                ariaLabel='Menu'
                icon={<SpeedDialIcon icon={<Icon>menu</Icon>} openIcon={<Icon>clear</Icon>} />}
                onMouseEnter={this.handleOpen}
                onMouseLeave={this.handleClose}
                onClick={this.handleClick}
            >
                {this.state.actions.map(action => {
                    return (
                        <SpeedDialAction
                            key={action.name}
                            className={action.color}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.callback} />
                    );
                })}
            </SpeedDial>
        );
    }
}

export default Menu;
