'use client';

import {
  List, Stack, Title, Text, Space, Container,
} from '@mantine/core';
import React from 'react';

export const TermsOfService = () => (
  <Container size="md">
    <Stack
      gap="md"
      p="lg"
    >
      <Title>
        QuizWis 利用規約
      </Title>
      <Text pl="lg">
        この利用規約（以下、「本規約」）は、サークル「.teQ」（以下、「当サークル」といいます。）がこのウェブサイト上で
        提供するサービス（以下、「本サービス」）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」）には、
        本規約に従って、本サービスをご利用いただきます。
      </Text>
      <Title order={2}>
        第1条（適用）
      </Title>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>
          本規約は、ユーザーと当サークルとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
        </List.Item>
        <List.Item>
          当サークルは本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」）をすることがあります。
          これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
        </List.Item>
        <List.Item>
          本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
        </List.Item>
      </List>
      <Title order={2}>
        第2条（ログイン情報の管理）
      </Title>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>
          本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって外部アカウントにて利用登録を行うことによって，利用登録が完了するものとします。
        </List.Item>
        <List.Item>
          当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
        </List.Item>
        <List withPadding>
          <List.Item>利用登録の申請に際して虚偽の事項を届け出た場合</List.Item>
          <List.Item>本規約に違反したことがある者からの申請である場合</List.Item>
          <List.Item>その他，当社が利用登録を相当でないと判断した場合</List.Item>
        </List>
        <List.Item>
          ユーザーは，自己の責任において，本サービスのログイン用アカウントを適切に管理するものとします。
        </List.Item>
        <List.Item>
          ユーザーは，いかなる場合にも，ログイン用アカウントを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。
          当サークルは，同一のログイン用アカウントを用いてログインされた場合には，そのログイン用アカウントを登録しているユーザー自身による利用とみなします。
        </List.Item>
        <List.Item>
          ログイン用アカウントが第三者によって使用されたことによって生じた損害は，当サークルに故意又は重大な過失がある場合を除き，当サークルは一切の責任を負わないものとします。
        </List.Item>
      </List>
      <Title order={2}>
        第3条（禁止事項）
      </Title>
      <Text>
        ユーザーは，本サービスの利用にあたり，以下の行為を行ってはならないものとします。
      </Text>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>法令または公序良俗に違反する行為</List.Item>
        <List.Item>犯罪行為に関連する行為</List.Item>
        <List.Item>当サークルのサーバーに対する攻撃行為または妨害行為</List.Item>
        <List.Item>当サークルのサービスの運営を妨害するおそれのある行為</List.Item>
        <List.Item>他のユーザーに関する個人情報等を収集または蓄積する行為</List.Item>
        <List.Item>不正アクセスをし，またはこれを試みる行為</List.Item>
        <List.Item>他のユーザーに成りすます行為</List.Item>
        <List.Item>当サークル，他のユーザーまたはその他の第三者の知的財産権他権利あるいは利益を侵害する行為</List.Item>
        <List.Item>以下の表現を含み，または含むと当サークルが判断する内容を本サービス上に投稿し，または送信する行為</List.Item>
        <List withPadding>
          <List.Item>過度に暴力的な表現</List.Item>
          <List.Item>過度に露骨な性的表現</List.Item>
          <List.Item>人種，国籍，信条，性別，社会的身分，門地等による差別を助長する表現</List.Item>
          <List.Item>自殺，自傷行為，薬物乱用を誘引または助長する表現</List.Item>
          <List.Item>その他反社会的な内容を含み他人に不快感を与える表現</List.Item>
        </List>
        <List.Item>以下を目的とし，または目的とすると当サークルが判断する行為</List.Item>
        <List withPadding>
          <List.Item>性行為やわいせつな行為を目的とする行為</List.Item>
          <List.Item>面識のない異性との出会いや交際を目的とする行為</List.Item>
          <List.Item>他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為</List.Item>
          <List.Item>当サークル，本サービス，他のユーザーまたはその他の第三者の名誉または信頼を毀損する行為</List.Item>
          <List.Item>違法行為を目的とする行為</List.Item>
          <List.Item>その他，当サークルが不適切と判断する行為</List.Item>
        </List>
        <List.Item>宗教活動または宗教団体への勧誘行為</List.Item>
        <List.Item>その他，当サークルが不適切と判断する行為</List.Item>
      </List>
      <Title order={2}>
        第4条（本サービスの提供の停止等）
      </Title>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>
          当サークルは以下のいずれかに該当する場合には，ユーザーに事前に通知することなく，本サービスの全部または
          一部の提供を停止または中断することができるものとします。
        </List.Item>
        <List withPadding>
          <List.Item>本サービスにかかるコンピューター・システムの保守点検または更新を行う場合</List.Item>
          <List.Item>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</List.Item>
          <List.Item>コンピューターまたは通信回線等が事故により停止した場合</List.Item>
          <List.Item>その他，当サークルが本サービスの提供が困難と判断した場合</List.Item>
        </List>
        <List.Item>
          当サークルは，本サービスの提供の停止または中断により，ユーザーまたは第三者が被った損害について，
          理由の如何に関わらず一切の責任を負わないものとします。
        </List.Item>
      </List>
      <Title order={2}>
        第5条（利用制限および登録抹消）
      </Title>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>
          当サークルは，以下の場合には，事前の通知なく，ユーザーに対して本サービスの全部もしくは
          一部の利用を制限しまたは本サービスへの登録を抹消することができるものとします。
        </List.Item>
        <List withPadding>
          <List.Item>本規約のいずれかの条項に違反した場合</List.Item>
          <List.Item>登録事項に虚偽の事実があることが判明した場合</List.Item>
          <List.Item>料金等の支払債務の不履行があった場合</List.Item>
          <List.Item>その他，当サークルが本サービスの利用を適当でないと判断した場合</List.Item>
        </List>
        <List.Item>
          ユーザーは，本条に基づき当サークルが行った行為によりユーザーに生じた損害について，一切の責任を負いません。
        </List.Item>
      </List>
      <Title order={2}>
        第6条（保証の否認および免責事項）
      </Title>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>
          当サークルの債務不履行責任は，当サークルの故意または重過失によらない場合には免責されるものとします。
        </List.Item>
        <List.Item>
          当サークルは，本サービスに関して，ユーザーが希望する機能を有し，ユーザーによって適切に利用されることを保証するものではありません。
        </List.Item>
        <List.Item>
          当サークルは，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
        </List.Item>
      </List>
      <Title order={2}>
        第7条（サービス内容の変更等）
      </Title>
      <Text pl="lg">
        当サークルは，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中断することができるものとします。
      </Text>
      <Title order={2}>
        第8条（利用規約の変更）
      </Title>
      <Text pl="lg">
        当サークルは，必要と判断しかつユーザーの一般の利益に適合すると判断した場合には，ユーザーに通知することなく，本規約を変更することができるものとします。
      </Text>
      <Title order={2}>
        第9条（通知または連絡）
      </Title>
      <Text pl="lg">
        ユーザーと当サークルとの間の通知または連絡は，当サークルの定める方法によって行うものとします。
        当サークルは,ユーザーから,当サークルが別途定める方法により連絡があった場合には,当該連絡について,ユーザーに対して当サークルが連絡したものとみなします。
      </Text>
      <Title order={2}>
        第10条（権利義務の譲渡の禁止）
      </Title>
      <Text pl="lg">
        ユーザーは，当サークルの書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利または義務を第三者に譲渡し，または担保に供することはできません。
      </Text>
      <Title order={2}>
        第11条（準拠法・裁判管轄）
      </Title>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>
          本規約の解釈にあたっては，日本法を準拠法とします。
        </List.Item>
        <List.Item>
          本サービスに関して紛争が生じた場合には，当サークルの代表居住地を管轄する裁判所を専属的合意管轄とします。
        </List.Item>
      </List>
      <Space h="lg" />
      <Title order={2}>
        変更履歴
      </Title>
      <List type="ordered" spacing="sm" withPadding>
        <List.Item>2023年8月1日: 初版</List.Item>
      </List>
    </Stack>
  </Container>
);
