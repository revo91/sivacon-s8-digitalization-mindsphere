import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { manageLanguageDialog } from '../actions/languageDialog';
import { withTranslation } from 'react-i18next';

class LanguageDialog extends React.Component {

    handleDialogOpen = () => {
        this.props.manageLanguageDialog(true)
    }

    handleDialogClose = () => {
        this.props.manageLanguageDialog(false)
    }

    handleChangeLanguage = (lang) => {
        this.props.i18n.changeLanguage(lang)
        this.handleDialogClose()
    }
    
    render() {
        const { open, t } = this.props;
        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={()=>this.handleDialogClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{t('languageDialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t('languageDialogText')}
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>this.handleChangeLanguage('en')} color="primary">
                            {t('languageDialogEnglishLanguage')}
          </Button>
                        <Button onClick={()=>this.handleChangeLanguage('pl')} color="primary" autoFocus>
                            {t('languageDialogPolishLanguage')}
          </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        language: state.languageDialogReducer.language,
        open: state.languageDialogReducer.openDialog
    };
}

const mapDispatchToProps = {
    manageLanguageDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LanguageDialog))