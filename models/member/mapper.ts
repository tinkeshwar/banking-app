import type { CreateMemberRequestPayloadInterface, ListMemberInterface, ListMemberResponseInterface, MemberFormInterface } from "~/models/member/interface";

export const memberPostPayloadMapper = (data: MemberFormInterface): CreateMemberRequestPayloadInterface => {
  const { current, permanent, ...rest } = data;
  return {
    ...rest,
    addresses: [
      {
        ...current,
        address_type: 'Local'
      },
      {
        ...permanent,
        address_type: 'Permanent'
      }
    ]
  }
}

export const memberListMapper = (data: ListMemberResponseInterface[]): ListMemberInterface[] => {
  return data.map((member: ListMemberResponseInterface) => {
    return {
      id: member.user_id,
      name: `${member.first_name} ${member.last_name}`,
      gender: member.gender,
      mobile: member.mobile,
      department: member.department,
      staff: member.staff_type,
      status: capitalizeFirstLetter(member.employment_status)
    }
  })
}