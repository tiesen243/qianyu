import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { BottomSheet } from 'heroui-native/bottom-sheet'
import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import { Label } from 'heroui-native/label'
import { TextField } from 'heroui-native/text-field'
import { useToast } from 'heroui-native/toast'
import { PencilIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Keyboard } from 'react-native'

import { useAuth } from '@/components/auth-provider'
import { Icon } from '@/components/ui/icon'

export const EditProfileButton: React.FC = () => {
  const { user, setUser } = useAuth()
  const { toast } = useToast()

  const [data, setData] = useState(user)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    setUser(data)
    setIsOpen(false)
    toast.show('Profile updated successfully!')
  }

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <Button variant='outline' size='sm'>
          <Icon as={PencilIcon} className='size-3 text-foreground' />
          <Button.Label>Edit Profile</Button.Label>
        </Button>
      </BottomSheet.Trigger>

      <BottomSheet.Portal>
        <BottomSheet.Overlay />

        <BottomSheet.Content
          onClose={() => Keyboard.dismiss()}
          android_keyboardInputMode='adjustResize'
          keyboardBlurBehavior='restore'
          snapPoints={['30%', '90%']}
        >
          <BottomSheetScrollView>
            <BottomSheet.Title>Edit Profile</BottomSheet.Title>
            <BottomSheet.Description>
              Update your profile information below. Changes will be saved
              automatically.
            </BottomSheet.Description>

            {fields.map(({ name, label, placeholder }) => (
              <TextField key={name} className='mt-4'>
                <Label>{label}</Label>

                <Input
                  placeholder={placeholder}
                  value={data[name]}
                  onChangeText={(text) =>
                    setData((prev) => ({ ...prev, [name]: text }))
                  }
                />
              </TextField>
            ))}

            <Button className='mt-4' onPress={handleSubmit}>
              Save Changes
            </Button>
          </BottomSheetScrollView>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  )
}

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Your name' },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Your description',
  },
  { name: 'avatarUrl', label: 'Avatar URL', placeholder: 'https://...' },
  { name: 'bannerUrl', label: 'Banner URL', placeholder: 'https://...' },
] as const
