/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useNavigate } from 'react-router-dom';
import React from 'react';

import classNames from 'classnames';
// import {
//   IconBrandCnWhiteRow,
//   IconBrandCnBlackRow,
//   IconBrandEnBlackRow,
// } from '@coze-arch/bot-icons';

import styles from './index.module.less';

export interface CozeBrandProps {
  isOversea: boolean;
  isWhite?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// 原版的判断，包括了白色版黑夜版以及国内外版的判断
// export function CozeBrand({
//   isOversea,
//   isWhite,
//   className,
//   style,
// }: CozeBrandProps) {
//   const navigate = useNavigate();
//   const navBack = () => {
//     navigate('/');
//   };
//   if (isOversea) {
//     return (
//       <IconBrandEnBlackRow
//         onClick={navBack}
//         className={classNames(styles['coze-brand'], className)}
//         style={style}
//       />
//     );
//   }
//   if (isWhite) {
//     return (
//       <IconBrandCnWhiteRow
//         onClick={navBack}
//         className={classNames(styles['coze-brand'], className)}
//         style={style}
//       />
//     );
//   }
//   return (
//     <IconBrandCnBlackRow
//       onClick={navBack}
//       className={classNames(styles['coze-brand'], className)}
//       style={style}
//     />
//   );
// }

import MyLogo from './Data-Development-Logo.svg';

export function CozeBrand({ className, style }: CozeBrandProps) {
  const navigate = useNavigate();
  const navBack = () => {
    navigate('/');
  };

  return (
    <div
      onClick={navBack}
      className={classNames(
        styles['coze-brand'],
        className,
        'flex items-center gap-2 cursor-pointer select-none',
      )}
      style={style}
    >
      <img
        src={MyLogo}
        alt="Brand Icon"
        style={{ height: '28px' }} // 锁死图标高度
      />

      <span className="text-lg font-bold text-gray-800 tracking-wide">
        哈尔滨数据发展集团有限公司
      </span>
    </div>
  );
}
