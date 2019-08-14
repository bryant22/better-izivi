import classNames from 'classnames';
import * as React from 'react';
import injectSheet, { WithSheet } from 'react-jss';

import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import bg from '../assets/bg.jpg';
import createStyles from '../utilities/createStyles';
import { LoadingInformation } from './LoadingInformation';
import { Theme } from './theme';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      '@media (min-width: 1024px)': {
        padding: `${theme.layout.baseSpacing}px ${2 * theme.layout.baseSpacing}px`,
      },
      'composes': 'mo-container',
    },
    background: {
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      minHeight: '94vh',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      height: 'auto',
    },
  });

interface Props extends WithSheet<typeof styles> {
  children: React.ReactNode;
  className?: string;
  showBackgroundImage?: boolean;
  card?: boolean;
  title?: string;
  fullscreen?: boolean;
  loading?: boolean;
}

class IziviContent extends React.Component<Props> {
  updateTitle() {
    document.title = this.props.title ? `iZivi - ${this.props.title}` : 'iZivi';
  }

  render = () => {
    this.updateTitle();
    const { classes, children, loading, showBackgroundImage, card, title } = this.props;
    const content = loading ? <LoadingInformation /> : children;
    const klassNames = classNames(
      this.props.className,
      classes.container,
      { [classes.background]: showBackgroundImage },
      (!this.props.showBackgroundImage && !this.props.fullscreen ? 'container' : undefined),
    );

    return (
      <div className={klassNames}>
        {card ? (
          <Card className={classes.card}>
            <CardBody>
              {title && <h1>{title}</h1>}
              <br />
              {content}
            </CardBody>
          </Card>
        ) : (
          <div>
            {title && <h1>{title}</h1>}
            {content}
          </div>
        )}
      </div>
    );
  }
}

export default injectSheet(styles)(IziviContent);
