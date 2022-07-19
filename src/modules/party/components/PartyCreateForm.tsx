import React from 'react';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import {
  CoordinatesCreateInput,
  PartyAvailability,
  usePartyCreateMutation,
} from '../../../api';
import {
  Box,
  Button,
  FormikTextInput,
  FormikSelect,
} from '../../../components';
import { Maybe } from '../../../types';

type FormValues = {
  name: string;
  availability: Maybe<PartyAvailability>;
  date: string;
  address: string;
  coordinates: CoordinatesCreateInput;
  openBar: boolean;
  allowInvites: boolean;
  description: string;
};

export const PartyCreateForm: React.FC = () => {
  const [create, { loading: isLoading }] = usePartyCreateMutation();
  const initialValues: FormValues = {
    name: '',
    availability: null,
    date: '',
    address: '',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    openBar: true,
    allowInvites: true,
    description: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .min(3)
      .max(20)
      .matches(/^[a-zA-Z\s]*$/, 'Solo puede contener letras y espacios.'),
    email: Yup.string().required().email(),
    nickname: Yup.string()
      .required()
      .min(3)
      .max(15)
      .matches(
        /^[a-zA-Z0-9_]{3,15}$/,
        'Solo puede contener letras, numeros y guiones bajos.'
      ),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.'),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const { data } = await create({
        variables: {
          data: values,
        },
      });

      if (!data?.partyCreate) {
        Toast.show({
          type: 'error',
          text1: 'Hubo un error al intentar crear la fiesta',
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al intentar crear la fiesta',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <>
          <Box flex flexGrow={1}>
            <FormikTextInput id="name" placeholder="Nombre" mt={1} />
            <Box flex row mt={1}>
              <FormikSelect
                id="availability"
                options={[
                  { label: 'Publica', value: PartyAvailability.Public },
                  {
                    label: 'Solo seguidores',
                    value: PartyAvailability.Followers,
                  },
                  {
                    label: 'Solo seguidos',
                    value: PartyAvailability.Following,
                  },
                  { label: 'Privada', value: PartyAvailability.Private },
                ]}
                mr={1}
                flexGrow={1}
              />
              <FormikTextInput id="date" placeholder="Fecha" />
            </Box>
            <FormikTextInput id="address" placeholder="Direccion" mt={1} />
            <Box flex row mt={1}>
              <FormikSelect
                id="openBar"
                options={[
                  { label: 'Si', value: PartyAvailability.Public },
                  {
                    label: 'Solo seguidores',
                    value: PartyAvailability.Followers,
                  },
                  {
                    label: 'Solo seguidos',
                    value: PartyAvailability.Following,
                  },
                  { label: 'Privada', value: PartyAvailability.Private },
                ]}
                mr={1}
                flexGrow={1}
              />
              <FormikTextInput id="date" placeholder="Fecha" />
            </Box>
          </Box>
          <Button onPress={() => submitForm()} isLoading={isLoading}>
            Crear
          </Button>
        </>
      )}
    </Formik>
  );
};
