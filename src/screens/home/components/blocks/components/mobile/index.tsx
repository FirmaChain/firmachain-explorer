import { Fragment } from 'react';
import { AvatarName, SingleBlockMobile } from '@components';
import { Divider, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { Link } from 'react-router';

import { ItemType } from '../../types';

const Mobile = ({ className, items }: { className?: string; items: ItemType[] }) => {
    return (
        <div className={clsx(className)}>
            {items.map((x, i, arr) => {
                return (
                    <Fragment key={`${x.height}-${i}`}>
                        <SingleBlockMobile
                            height={
                                <Link to={BLOCK_DETAILS(x.height)}>
                                    <Typography variant="body1" className="value" component="a">
                                        {numeral(x.height).format('0,0')}
                                    </Typography>
                                </Link>
                            }
                            txs={numeral(x.txs).format('0,0')}
                            time={dayjs.utc(x.timestamp).fromNow()}
                            proposer={<AvatarName address={x.proposer.address} imageUrl={x.proposer.imageUrl} name={x.proposer.name} />}
                            hash={getMiddleEllipsis(x.hash, {
                                beginning: 13,
                                ending: 10
                            })}
                        />
                        {i !== arr.length - 1 && <Divider />}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default Mobile;
