import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet'
import { BottomSheet } from 'heroui-native/bottom-sheet'
import { Button } from 'heroui-native/button'
import { inputClassNames } from 'heroui-native/input'
import { Label } from 'heroui-native/label'
import { TextField } from 'heroui-native/text-field'
import { useToast } from 'heroui-native/toast'
import { PencilIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Keyboard } from 'react-native'

import { Icon } from '@/components/ui/icon'
import { useProfile } from '@/screens/(tabs)/profile/screen.provider'

export const EditProfileButton: React.FC = () => {
  const { profile, setProfile } = useProfile()
  const { toast } = useToast()

  const [data, setData] = useState(profile)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    setProfile(data)
    setIsOpen(false)
    toast.show('Profile updated successfully!')
  }

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <Button variant='outline' size='sm'>
          <Icon as={PencilIcon} className='text-foreground' />
          <Button.Label>Edit Profile</Button.Label>
        </Button>
      </BottomSheet.Trigger>

      <BottomSheet.Portal>
        <BottomSheet.Overlay />

        <BottomSheet.Content
          android_keyboardInputMode='adjustResize'
          onClose={() => Keyboard.dismiss()}
          enableHandlePanningGesture
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

                <BottomSheetTextInput
                  className={inputClassNames.input()}
                  placeholderTextColorClassName={inputClassNames.placeholderTextColor()}
                  selectionColorClassName={inputClassNames.inputSelectionColor()}
                  placeholder={placeholder}
                  defaultValue={profile[name]}
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
