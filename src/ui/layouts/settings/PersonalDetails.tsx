import React, { useState } from 'react';
import { getInitials } from '../../../utils';
import {
  Box,
  ColoredSquare,
  FlexBox,
  FormTextField,
  FormPasswordField,
  Paragraph,
  Row,
  Col
} from '../../components';
import { useRequestOnMount, useSelector } from '../../hooks';
import {
  organizationActions,
  sessionActions,
  showToasterAction,
  userActions,
} from '../../../redux/actions';

import { organizationSelectors, userSelectors } from '../../../redux/selectors';
import { getTranslateByScope } from '../../../services';
import { useDispatch } from 'react-redux';
import { toasterTypes } from '../../../constants';
import { PrimaryButton } from '../../components/buttons/index';
import { EmailPopup } from './EmailPopup';

export const translate = getTranslateByScope('ui.layouts.PersonalDetails');

export const PersonalDetails: React.FC = () => {
  useRequestOnMount(organizationActions.getMy, {});
  useRequestOnMount(userActions.getMy, {});
  const dispatch = useDispatch();

  const organization = useSelector(organizationSelectors.myOrganization);
  const user = useSelector(userSelectors.myUser);

  const [submitting, setSubmitting] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false);
  const [email, setEmail] = useState(user?.email)
  const [username, setUsername] = useState(user?.name)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  if (!organization || !user) return null;

  const forgotPassword = () => {

    if (newPassword !== confirmPassword) {
      dispatch(showToasterAction({
          description: 'Password not Matched',
          type: toasterTypes.failure,
        })
      )
    } else {
    setSubmitting(true)
    dispatch(
      sessionActions.forgotPassword({
        email: user.email,
        password: newPassword,
        onFailure: () => {
          setSubmitting(false)
          dispatch(
            showToasterAction({
              description: translate('toasts.failed.text'),
              type: toasterTypes.failure,
            }),
          );
        },
        onSuccess: () => {
          setSubmitting(false)
          dispatch(
            showToasterAction({
              description: translate('toasts.successful.text'),
              type: toasterTypes.success,
            }),
          );
        },
      }),
    );
    }
  };

  return (
    <>
    {popupOpen && (
      <EmailPopup userId={user?.id} email={email} username={username} setPopupOpen={setPopupOpen} />
    )}
    <FlexBox.Column style={{ marginLeft: '40px' }} flex={1}>
      <FlexBox.Row  alignItems="center">
        <Box>
          <ColoredSquare size="md" color="secondary">
            <Paragraph color="white">
              {getInitials(organization.name)}
            </Paragraph>
          </ColoredSquare>
        </Box>
        <Box marginLeft="md">
          <Paragraph bold>{organization.name}</Paragraph>
        </Box>
      </FlexBox.Row>

        <Box marginTop="lg" >
          <Row>
            <Col lg={5}>
              <Box marginBottom="lg">
                <FormTextField
                  label={translate('form.email.label')}
                  labelColor='#000'
                  placeholder={translate('form.email.placeholder')}
                  value={email ? email : ''}
                  onChange={(val: string) => setEmail(val)}
                />
              </Box>

              <Box marginBottom="lg">
                <FormTextField
                  label={translate('form.username.label')}
                  labelColor='#000'
                  placeholder={translate('form.username.placeholder')}
                  value={username ? username : ''}
                  onChange={(val: string) => setUsername(val)}
                />
              </Box>

                <Box style={{ display: 'flex', justifyContent: 'end' }}>
                  <PrimaryButton style={{ width: '278px' }} onClick={() => setPopupOpen(true)} disabled={email === user.email && username === user.name} >
                    {translate('emailNameReset.label')}
                  </PrimaryButton>
                </Box>
            </Col>
          </Row>
        </Box>
   
      <Box marginBottom="lg" marginTop="xl">
        <Row>
          <Col lg={5}>
                <Box marginBottom="lg">
                  <FormPasswordField
                    label={translate('form.passwordChange.currentPassword.label')}
                    labelColor='#000'
                    placeholder={translate('form.passwordChange.currentPassword.placeholder')}
                    value={currentPassword}
                    onChange={(val: string) => setCurrentPassword(val)}
                    error={{
                      hasError: currentPassword.trim() === undefined,
                      text: translate('form.passwordChange.currentPassword.required'),
                    }}
                    showPasswordOption
                  />
                </Box>
                <Box marginBottom="lg">
                  <FormPasswordField
                    label={translate('form.passwordChange.newPassword.label')}
                    labelColor='#000'
                    placeholder={translate('form.passwordChange.newPassword.placeholder')}
                    value={newPassword}
                    onChange={(val: string) => setNewPassword(val)}
                    error={{
                      hasError: newPassword.trim() === undefined,
                      text: translate('form.passwordChange.newPassword.required'),
                    }}
                    showPasswordOption
                  />
                </Box>
                <Box marginBottom="lg">
                  <FormPasswordField
                    label={translate('form.passwordChange.confirmPassword.label')}
                    labelColor='#000'
                    placeholder={translate('form.passwordChange.confirmPassword.placeholder')}
                    value={confirmPassword}
                    onChange={(val: string) => setConfirmPassword(val)}
                    error={{
                      hasError: confirmPassword.trim() === undefined,
                      text: translate('form.passwordChange.confirmPassword.required'),
                    }}
                    showPasswordOption
                  />
                </Box>

                <Box marginBottom="xs" style={{ display: 'flex', justifyContent: 'end' }}>
                  <PrimaryButton onClick={forgotPassword} style={{ width: '278px' }} loading={submitting} disabled={newPassword.trim() === '' || confirmPassword.trim() === ''}>
                    {translate('passwordReset.button')}
                  </PrimaryButton>
                </Box>
          </Col>
       
        </Row>
      </Box>
    </FlexBox.Column>
  </>
  );
};