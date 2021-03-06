import * as React from 'react';
import Alert from 'reactstrap/lib/Alert';
import Form from 'reactstrap/lib/Form';
import { CheckboxField } from '../../../form/CheckboxField';
import { SelectField, TextField } from '../../../form/common';
import { DatePickerField } from '../../../form/DatePickerField';
import { ServiceSpecificationSelect } from '../../../form/entitiySelect/ServiceSpecificationSelect';
import { WiredField } from '../../../form/formik';
import { Service } from '../../../types';
import Effect, { OnChange } from '../../../utilities/Effect';

export const ServiceModalForm = (props: { serviceDateRangeChangeHandler: OnChange<Service> }) => {
  const { serviceDateRangeChangeHandler } = props;

  return (
    <>
      <Form>
        <Alert color="info">
          <b>Hinweis:</b> Du kannst entweder das gewünschte Enddatum für deinen Einsatz eingeben, und die anrechenbaren
          Einsatztage werden gerechnet, oder die gewünschten Einsatztage eingeben, und das Enddatum wird berechnet. In beiden
          Fällen musst du das Startdatum bereits eingegeben haben.
        </Alert>
        <WiredField
          horizontal
          component={ServiceSpecificationSelect}
          name={'service_specification_id'}
          label={'Pflichtenheft'}
        />
        <WiredField
          horizontal
          component={SelectField}
          name={'service_type'}
          label={'Einsatzart'}
          options={[
            { id: 'normal', name: '' },
            { id: 'first', name: 'Erster Einsatz' },
            { id: 'last', name: 'Letzter Einsatz' },
            ]}
        />
        <Effect onChange={serviceDateRangeChangeHandler}/>
        <WiredField horizontal component={DatePickerField} name={'beginning'} label={'Einsatzbeginn'}/>
        <WiredField horizontal component={DatePickerField} name={'ending'} label={'Einsatzende'}/>
        <WiredField horizontal component={TextField} name={'service_days'} label={'Einsatztage'}/>
        <WiredField horizontal component={CheckboxField} name={'first_swo_service'} label={'Erster SWO Einsatz?'}/>
        <WiredField horizontal component={CheckboxField} name={'long_service'} label={'Langer Einsatz?'}/>
        <WiredField horizontal component={CheckboxField} name={'probation_period'} label={'Probe-einsatz?'}/>
      </Form>
    </>
  );
};
