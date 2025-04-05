import { AddressType, type CreateMemberRequestPayloadInterface, type ListMemberInterface, type ListMemberResponseInterface, type MemberFormInterface } from "~/models/member/interface";

export const memberPostPayloadMapper = (data: MemberFormInterface): CreateMemberRequestPayloadInterface => {
  const { current, permanent, ...rest } = data;
  return {
    ...rest,
    addresses: [
      {
        ...current,
        address_type: AddressType.LOCAL
      },
      {
        ...permanent,
        address_type: AddressType.PERMANENT
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