import React, { forwardRef } from 'react';
import {
  getHandler,
  PlateElement,
  PlateElementProps,
  Value,
} from '@udecode/plate-common';
import { TMentionElement } from '@udecode/plate-mention';
import { useFocused, useSelected } from 'slate-react';
import { getPlainExcerpt } from "@quillforms/admin-components";
import { Icon } from "@wordpress/components";
import classnames from "classnames";
import { css } from "emotion";
import { cn } from '../../lib/utils';

export interface MentionElementProps
  extends PlateElementProps<Value, TMentionElement> {
  /**
   * Prefix rendered before mention
   */
  prefix?: string;
  onClick?: (mentionNode: any) => void;
  renderLabel?: (mentionable: TMentionElement) => string;
}


const MentionElement = forwardRef<
  React.ElementRef<typeof PlateElement>,
  MentionElementProps
>(({ prefix, renderLabel, className, onClick, ...props }, ref) => {
  const { children, element } = props;

  const selected = useSelected();
  const focused = useFocused();
  const item = element.item;
  const mergeTagIcon = item?.iconBox.icon;
  const renderedIcon = (
    <Icon
      icon={
        (mergeTagIcon)
          ? (mergeTagIcon?.src)
          // @ts-expect-error
          : (mergeTagIcon)
      }
    />
  );
  return (
    <PlateElement
      ref={ref}
      className={cn(
        'inline-block',
        className
      )}
      data-slate-value={element.value}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      {/* {prefix}
      {element.value} */}
      < span
        contentEditable={false}
        className={
          classnames(
            'rich-text-merge-tag__node-wrapper',
            css`
							color: ${item?.iconBox.color
                ? item?.iconBox?.color
                : '#bb426f'
              };
              bordercolor: ${item?.iconBox.color
                ? item?.iconBox.color
                : '#bb426f'
              };
              fill: ${item?.iconBox.color
                ? item?.iconBox.color
                : '#bb426f'
              };
              padding: 1.5px 8px;
`
          )}
      >
        <span
          className={classnames(
            'rich-text-merge-tag__background',
            css`
                background: ${item?.iconBox.color
                ? item?.iconBox.color
                : '#bb426f'
              };
`
          )}
        />
        <span className="rich-text-merge-tag__icon-box">
          {renderedIcon}
        </span>
        <span
          className="rich-text-merge-tag__title"
          dangerouslySetInnerHTML={{
            __html: getPlainExcerpt(item.label),
          }}
        />
        {children}

      </span>
    </PlateElement>
  );
});

MentionElement.displayName = 'MentionElement';

export { MentionElement };