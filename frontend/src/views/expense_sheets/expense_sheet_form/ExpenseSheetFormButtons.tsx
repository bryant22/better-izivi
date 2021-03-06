import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { MainStore } from '../../../stores/mainStore';
import { ExpenseSheet, Service } from '../../../types';
import {
  ExclamationSolidIcon,
  PrintSolidIcon,
  SaveRegularIcon,
  TrashAltRegularIcon, UserIcon,
} from '../../../utilities/Icon';

type func = () => void;

interface ExpenseSheetFormButtonsProps {
  safeOverride: boolean;
  onForceSave: func;
  onSave: func;
  onDelete: func;
  expenseSheet: ExpenseSheet;
  mainStore: MainStore;
  service: Service;
}

function getSaveButton({ safeOverride, onForceSave, onSave, expenseSheet }: ExpenseSheetFormButtonsProps) {
  if (expenseSheet.modifiable) {
    if (safeOverride) {
      return (
        <Button
          block
          color={'primary'}
          onClick={onForceSave}
        >
          <FontAwesomeIcon icon={ExclamationSolidIcon}/> Speichern erzwingen
        </Button>
      );
    } else {
      return (
        <Button
          block
          color={'primary'}
          onClick={onSave}
        >
          <FontAwesomeIcon icon={SaveRegularIcon}/> Speichern
        </Button>
      );
    }
  } else {
    return (
      <>
        <div id={'ExpenseSheetSaveButtonWrapper'}>
          <Button
            block
            disabled
            color={'primary'}
            style={{ pointerEvents: 'none' }}
          >
            <FontAwesomeIcon icon={SaveRegularIcon}/> Speichern
          </Button>
        </div>
        <UncontrolledTooltip
          trigger={'hover focus'}
          delay={{ show: 0, hide: 0 }}
          target={'ExpenseSheetSaveButtonWrapper'}
          placement={'top'}
        >
          Nur offene Spesen können modifiziert werden!
        </UncontrolledTooltip>
      </>
    );
  }
}

function getDeleteButton({ onDelete, expenseSheet }: ExpenseSheetFormButtonsProps) {
  if (expenseSheet.deletable) {
    return (
      <Button block color={'danger'} onClick={onDelete}>
        <FontAwesomeIcon icon={TrashAltRegularIcon}/> Löschen
      </Button>
    );
  } else {
    return (
      <>
        <div id={'ExpenseSheetDeleteButtonWrapper'}>
          <Button
            block
            disabled
            color={'danger'}
            style={{ pointerEvents: 'none' }}
          >
            <FontAwesomeIcon icon={TrashAltRegularIcon}/> Löschen
          </Button>
        </div>
        <UncontrolledTooltip
          trigger={'hover focus'}
          delay={{ show: 0, hide: 0 }}
          target={'ExpenseSheetDeleteButtonWrapper'}
          placement={'top'}
        >
          Nur offene Spesen können gelöscht werden!
        </UncontrolledTooltip>
      </>
    );
  }
}

function getPrintButton(mainStore: MainStore, expenseSheetId?: number) {
  const printURL = mainStore.apiURL(`expense_sheets/${expenseSheetId!}.pdf`);

  return (
    <Button block color={'warning'} disabled={!expenseSheetId} href={printURL} tag={'a'} target={'_blank'}>
      <FontAwesomeIcon icon={PrintSolidIcon}/> Drucken
    </Button>
  );
}

function getProfileButton(userId: number) {
  return (
    <Link to={'/users/' + userId} style={{ textDecoration: 'none' }}>
      <Button block><FontAwesomeIcon icon={UserIcon}/> Profil anzeigen</Button>
    </Link>
  );
}

export const ExpenseSheetFormButtons = (props: ExpenseSheetFormButtonsProps) => {
  const buttons = [
    getSaveButton(props),
    getDeleteButton(props),
    getPrintButton(props.mainStore, props.expenseSheet.id),
    getProfileButton(props.expenseSheet.user_id),
  ];

  return (
    <Row>
      {buttons.map((button, index) => (
        <Col key={index} className="mt-3">
          {button}
        </Col>
      ))}
    </Row>
  );
};
