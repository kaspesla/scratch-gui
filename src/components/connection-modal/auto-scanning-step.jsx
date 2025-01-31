import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import keyMirror from 'keymirror';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import Dots from './dots.jsx';

import closeIcon from '../close-button/icon--close.svg';

import radarIcon from './icons/searching.png';
import bluetoothIcon from './icons/bluetooth-white.svg';
import backIcon from './icons/back.svg';

import styles from './connection-modal.css';

const PHASES = keyMirror({
    prescan: null,
    pressbutton: null,
    notfound: null
});

const AutoScanningStep = props => (
    <Box className={styles.body}>
        <Box className={styles.activityArea}>
            <div className={styles.activityAreaInfo}>
                <div className={styles.centeredRow}>
                    {props.phase === PHASES.prescan && (
                        <React.Fragment>
                            <img
                                className={styles.radarBig}
                                src={radarIcon}
                            />
                            <img
                                className={styles.bluetoothCenteredIcon}
                                src={bluetoothIcon}
                            />
                        </React.Fragment>
                    )}
                    {props.phase === PHASES.pressbutton && (
                        <React.Fragment>
                            <img
                                className={classNames(styles.radarBig, styles.radarSpin)}
                                src={radarIcon}
                            />
                            <img
                                className={styles.connectionTipIcon}
                                src={props.connectionTipIconURL}
                            />
                        </React.Fragment>
                    )}
                    {props.phase === PHASES.notfound && (
                        <Box className={styles.instructions}>
                            <FormattedMessage
                                defaultMessage="No devices found"
                                description="Text shown when no devices could be found"
                                id="gui.connection.auto-scanning.noPeripheralsFound"
                            />
                        </Box>
                    )}
                </div>
            </div>
        </Box>
        <Box className={styles.bottomArea}>
            <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                {props.phase === PHASES.prescan && (
                    <FormattedMessage
                        defaultMessage="Have your device nearby, then press Search."
                        description="Prompt for beginning the search"
                        id="gui.connection.auto-scanning.prescan2"
                    />
                )}
                {props.phase === PHASES.pressbutton && (
                    <FormattedMessage
                        defaultMessage="Searching..."
                        description="Prompt for pushing the button on the device"
                        id="gui.connection.auto-scanning.pressbutton2"
                    />
                )}
            </Box>
            <Dots
                className={styles.bottomAreaItem}
                counter={0}
                total={3}
            />
            <Box className={classNames(styles.bottomAreaItem, styles.buttonRow)}>
                {props.phase === PHASES.prescan && (
                    <button
                        className={styles.connectionButton}
                        onClick={props.onStartScan}
                    >
                        <FormattedMessage
                            defaultMessage="Search"
                            description="Button in prompt for starting a search"
                            id="gui.connection.auto-scanning.start-search2"
                        />
                    </button>
                )}
                {props.phase === PHASES.pressbutton && (
                    <div className={styles.segmentedButton}>
                        <button
                            disabled
                            className={styles.connectionButton}
                        >
                            <FormattedMessage
                                defaultMessage="Searching..."
                                description="Label indicating that search is in progress"
                                id="gui.connection.connecting-searchbutton"
                            />
                        </button>
                        <button
                            className={styles.connectionButton}
                            onClick={props.onRefresh}
                        >
                            <img
                                className={styles.abortConnectingIcon}
                                src={closeIcon}
                            />
                        </button>
                    </div>
                )}
                {props.phase === PHASES.notfound && (
                    <button
                        className={styles.connectionButton}
                        onClick={props.onRefresh}
                    >
                        <img
                            className={styles.buttonIconLeft}
                            src={backIcon}
                        />
                        <FormattedMessage
                            defaultMessage="Try again"
                            description="Button in prompt for trying a device search again"
                            id="gui.connection.auto-scanning.try-again"
                        />
                    </button>
                )}
            </Box>
        </Box>
    </Box>
);

AutoScanningStep.propTypes = {
    connectionTipIconURL: PropTypes.string,
    onRefresh: PropTypes.func,
    onStartScan: PropTypes.func,
    phase: PropTypes.oneOf(Object.keys(PHASES))
};

AutoScanningStep.defaultProps = {
    phase: PHASES.prescan
};

export {
    AutoScanningStep as default,
    PHASES
};
