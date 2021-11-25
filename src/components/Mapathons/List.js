import { array, bool } from 'prop-types'
import React from 'react'
import { intlShape } from 'react-intl'
import styled from 'styled-components'

import Icn from '../Icon'
import RouterLink from '../RouterLink'
import { colors, media } from '../../styles'

import messages from './messages'

// const Wrapper = styled.div`
//   flex-grow: 1;
//   width: 100%;
//   &::after {
//     display: table;
//     clear: both;
//     content: '';
//   }
// `

// const Item = styled(RouterLink)`
//   float: left;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid ${colors.grey};
//   margin-bottom: 1rem;
//   margin-right: 0;
//   border-radius: 3px;
//   width: 100%;
//   height: 10rem;
//   background-color: white;
//   text-decoration: none;

//   &:active,
//   &:focus {
//     outline: 2px solid ${colors.secondary};
//   }

//   &:disabled,
//   &[disabled] {
//     opacity: 0.5;
//   }

//   ${media.tablet`
//     margin-bottom: 2rem;
//     margin-right: 2rem;
//     width: calc((100% - 2rem * 1) / 2);

//     &:nth-child(2n+2) {
//       float: right;
//       margin-right: 0;
//     }
//   `};

//   ${media.desktop`
//     flex-direction: column;

//     margin-bottom: 2rem;
//     margin-right: 2rem;
//     width: calc((100% - 2rem * 3) / 4);
//     height: 20rem;

//     &:nth-child(2n+2) {
//       float: left;
//       margin-right: 2rem;
//     }

//     &:nth-child(3n+3) {
//       float: left;
//       margin-right: 2rem;
//     }

//     &:nth-child(4n+4) {
//       float: right;
//       margin-right: 0;
//     }
//   `};
// `

// const Poster = styled.div`
//   flex-shrink: 0;
//   border-radius: 3px 0 0 3px;
//   width: 30%;
//   height: 99.9%;
//   background-image: ${props => `url("${props.image}")`};
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;

//   ${media.desktop`
//     flex-shrink: 1;
//     border-radius: 3px 3px 0 0;
//     height: 50%;
//     width: 100%;
//   `};
// `

// const Info = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: inherit;
//   padding: 1rem;
//   width: 70%;

//   ${media.desktop`
//     border-radius: 0 0 3px 3px;
//     height: 50%;
//     width: 100%;
//   `};
// `

// const Name = styled.h3`
//   overflow: hidden;
//   margin: 0 0 1rem 0;
//   width: 100%;
//   color: ${colors.darkestGrey};
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `

// const AddressWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0.2rem;
//   width: 100%;
// `

const Icon = styled(Icn)`
  flex-shrink: 0;
`

// const AddressText = styled.p`
//   overflow: hidden;
//   margin: 0 0 0 0.5rem;
//   color: ${colors.darkestGrey};
//   font-size: 0.9rem;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `

// const DatesWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
//   width: 100%;
// `

const DatesText = styled.p`
  overflow: hidden;
  margin: 0 0 0 0.5rem;
  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ReviewsBar = styled.div`
  height: 0.2rem;
  width: 100%;
  background-color: ${colors.lightGrey};
`

const ReviewsFill = styled.div`
  height: inherit;
  width: ${props => props.width};
  background-color: ${colors.success};
`

const ReviewsText = styled.p`
  overflow: hidden;
  color: ${colors.darkestGrey};
  font-size: 0.9rem;
  &:before {
    content: ' | ';
    margin-left: 0.25rem;
  }
`

//

const WrapperItem = styled.div`
  flex-grow: 1;
  width: 100%;
  &::after {
    display: table;
    clear: both;
    content: '';
  }
`

const Item = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.grey};
  border-radius: 10px;
  margin-bottom: 1rem;
  margin-right: 0;
  width: 100%;
  min-height: 10rem;
  background-color: white;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16%);
  overflow: hidden;

  &:active,
  &:focus {
    outline: 2px solid ${colors.secondary};
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }

  ${media.tablet`
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 1) / 2);

    &:nth-child(2n+2) {
      float: right;
      margin-right: 0;
    }
  `};

  ${media.desktop`
    flex-direction: column; 
    margin-bottom: 2rem;
    margin-right: 2rem;
    width: calc((100% - 2rem * 3) / 4);
    height: 20rem;

    &:nth-child(2n+2) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(3n+3) {
      float: left;
      margin-right: 2rem;
    }

    &:nth-child(4n+4) {
      float: right;
      margin-right: 0;
    }
  `};
`

const Poster = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 150px;
  background-image: ${props => `url("${props.image}")`};
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;

  ${media.desktop`
    flex-shrink: 1;
    width: 100%;
    height: 150px;
  `};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
  width: 100%;
  padding: 1rem;

  ${media.desktop`
    border-radius: 0 0 3px 3px;
    height: 50%;
    width: 100%;
  `};
`

const Name = styled.h3`
  overflow: hidden;
  margin: 0;
  width: 100%;
  color: ${colors.darkestGrey};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.3rem;
`

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  width: 100%;
`

const AddressText = styled.p`
  overflow: hidden;
  margin: 0 0 0 0.25rem;
  color: ${colors.darkestGrey};
  font-size: 0.9rem;
`

const DatesWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.primary};
`

const RowLeftWrapper = styled.div`
  display: flex;

  p {
    margin: 0;
  }
`
const IconWrapper = styled.div`
  display: flex;
`
const DescriptionWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.8rem;
`

//

const List = (props, context) => {
  const { formatMessage } = context.intl
  const { formatDate } = context.intl

  if (props.mapathons.length === 0) return null

  return (
    <WrapperItem>
      {props.mapathons.map(m => (
        <Item
          key={m.id}
          to={`/mapathons/${m.id}`}
          disabled={props.sendingRequest}
        >
          <Poster image={m.poster} />

          <Info>
            <Name>{m.name}</Name>
            <AddressWrapper>
              <Icon glyph="marker" size={1} color={colors.darkGrey} />
              <AddressText>{m.address}</AddressText>
            </AddressWrapper>

            <RowWrapper>
              <RowLeftWrapper>
                <DatesWrapper>
                  <DatesText>
                    {formatMessage(messages.dates, {
                      startDate: formatDate(new Date(m.startDate), {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }),
                      endDate: formatDate(new Date(m.endDate), {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      })
                    })}
                  </DatesText>
                </DatesWrapper>
                <ReviewsText>
                  {formatMessage(messages.reviews, {
                    amount: m.reviewsAmount === 0 ? '0' : m.reviewsAmount,
                    goal: m.reviewsGoal
                  })}
                </ReviewsText>
              </RowLeftWrapper>
              <IconWrapper>
                <Icon
                  glyph="portableRamp"
                  size={1}
                  color={colors.darkestGrey}
                />
                <Icon glyph="interior" size={1} color={colors.darkestGrey} />
                <Icon
                  glyph="toiletSupport"
                  size={1}
                  color={colors.darkestGrey}
                />
              </IconWrapper>
            </RowWrapper>

            <DescriptionWrapper>
              <p>
                We’re mapping for our friend AJ. AJ just moved to the
                neighborhood and is excited to explore the area. Let’s help him
                get around.
              </p>
            </DescriptionWrapper>
          </Info>
        </Item>
      ))}
    </WrapperItem>
  )
}

List.propTypes = {
  mapathons: array.isRequired,
  sendingRequest: bool.isRequired
}

List.contextTypes = {
  intl: intlShape
}

export default List
