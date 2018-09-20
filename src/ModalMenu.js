/**
 *  * Created by Khoroshikh Arkadiy on 06.09.2018.
 */
import React, { PureComponent } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { modalMenuManager } from './modalMenuManager';

class ModalMenu extends PureComponent {
    state = {
        type: 'fade',
        transparent: true,
        select: 0,
        options: [],
        visible: false,
        backgroundColor: 'rgba(0,0,0,0.5)',
    };

    handleCallback = null;
    _initialState = { ...this.state };

    componentDidMount() {
        modalMenuManager.registerModalMenuPopup(this);
    }

    componentWillUnmount() {
        modalMenuManager.unregisterModalMenuPopup(this);
    }

    showModalMenu = payload => {
        const {
            type = 'fade', //'slide', 'fade', 'none'
            transparent = true,
            select,
            options,
            callback,
            backgroundColor = 'rgba(0,0,0,0.5)',
        } = payload;

        this.handleCallback = callback;
        this.setState({
            type,
            transparent,
            select,
            options,
            callback,
            backgroundColor,
            visible: true,
        });
    };

    resetState = () => {
        this.setState({ ...this._initialState });
        this.handleCallback = null;
    };

    handleSelect = value => {
        this.handleCallback(value);
        this.resetState();
    };

    render() {
        const { options, visible, transparent, select, type, backgroundColor } = this.state;

        return (
            <Modal animationType={type} transparent={transparent} visible={visible} onRequestClose={() => {}}>
                <TouchableOpacity onPress={this.resetState} style={[styles.modalBackDrop, { backgroundColor, }]} />
                <Animatable.View style={styles.optionsContainer} animation="slideInUp" useNativeDriver duration={700}>
                    {options.map(item => (
                        <MenuField key={item.id} cb={this.handleSelect} item={item} selected={select === item.value} />
                    ))}
                </Animatable.View>
            </Modal>
        );
    }
}

class MenuField extends PureComponent {
    handleClick = () => (this.props.selected ? null : this.props.cb(this.props.item.value));

    render() {
        const { item, selected } = this.props;

        return (
            <TouchableOpacity onPress={this.handleClick} style={styles.priorityMenuField}>
                {!item.icon ? null : <View style={styles.iconContainer}>{item.icon}</View>}
                <Text>{item.name}</Text>
                {selected ? <View style={styles.iconSelect} /> : null}
                <View style={styles.customContent}>{item.customContent || null}</View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    modalBackDrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    optionsContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    iconContainer: {
        marginRight: 16,
    },
    priorityMenuField: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        paddingHorizontal: 16,
    },
    iconSelect: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4BC6D4',
        marginLeft: 20,
    },
    customContent: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

const showModalMenuPopup = modalMenuManager.showModalMenuPopup.bind(modalMenuManager);
export { ModalMenu, showModalMenuPopup }
