import { Button } from 'heroui-native/button'
import { Select } from 'heroui-native/select'
import { useToast } from 'heroui-native/toast'
import { DownloadIcon } from 'lucide-react-native'
import { Text, View } from 'react-native'

export default function IndexScreen() {
  const { toast } = useToast()

  return (
    <View className='flex-1 items-center justify-center gap-4 px-4'>
      <Text className='text-2xl font-bold text-white'>
        Welcome to the Home Screen!
      </Text>

      <Button onPress={() => toast.show('This is a toast message!')}>
        <DownloadIcon size={20} />
        <Button.Label>Show Toast</Button.Label>
      </Button>

      <Select presentation='dialog' className='w-full'>
        <Select.Trigger>
          <Select.Value placeholder='Choose an option' />
          <Select.TriggerIndicator />
        </Select.Trigger>

        <Select.Portal>
          <Select.Overlay />
          <Select.Content presentation='dialog'>
            <Select.Item value='apple' label='Apple' />
            <Select.Item value='orange' label='Orange' />
            <Select.Item value='banana' label='Banana' />
          </Select.Content>
        </Select.Portal>
      </Select>
    </View>
  )
}
