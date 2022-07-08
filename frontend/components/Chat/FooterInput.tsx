import { Flex, Input, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RiSendPlane2Fill } from 'react-icons/ri'
type FooterInputProps = {
  handleSendMessage: (message: string) => void;
}

type FormSchema = {
  message: string
}

export default function ({ handleSendMessage }: FooterInputProps) {
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<FormSchema>({ defaultValues: { message: "" } });

  const sendMessage = handleSubmit((data) => {
    handleSendMessage(data.message)
    reset()
  })

  return (
    <form onSubmit={sendMessage}>

      <Flex w="100%" p='1' direction='row'>
        <Input
          {...register("message")}
          placeholder="Type Something..."
          borderRadius="md"
        />
        <IconButton 
          ml='2'
          colorScheme='orange'
          type="submit"
          icon={<RiSendPlane2Fill />}
          aria-label='Send'
          fontSize='21px'
          disabled={!isDirty}
        />
      </Flex>
    </form>
  )
}