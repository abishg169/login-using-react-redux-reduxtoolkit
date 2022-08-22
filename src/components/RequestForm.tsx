import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    FormControl,
    Input,
    Select,
    FormLabel,
    Textarea,
    Stack
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {useState, useEffect} from "react"
import axios from "axios";
import { apiBaseUrl } from "@/data/api/axios-constant";
import { useAppSelector } from "@/hooks";

type RequestFormData = {
    requestCategory: string;
    requestSubCategory: string;
    dateFrom: string;
    dateTo: string;
    reason: string;
}

const RequestForm = () =>  {
    const {token} = useAppSelector(state => state.auth);
    const [categoryList, setCategoryList] = useState([
        {
            id: '62fd0195e022a251171bdcbd',
            name: 'Leave Request'
        },
        {
            id: '62fe2fc9c25fe7c7d313334b',
            name: 'Attendance Request'
        }
    ]);
    const [subcategoryList, setSubcategoryList] = useState([
        {
            id: '62fd01c1e022a251171bdcc4',
            name: 'Casual Leave',
            category: '62fd0195e022a251171bdcbd'
        },
        {
            id: '6303300508ed9c562c183ead',
            name: 'sick leave',
            category: '62fd0195e022a251171bdcbd'
        },
        {
            id: '62fe2fc9c25fe7c7d313334b',
            name: 'Do something',
            category: '62fe2fc9c25fe7c7d313334b'
        }
    ]);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: {errors} } = useForm<RequestFormData>();

    // const getCategories = async () => {
    //     console.log('token is', token)
    //     await axios({
    //         method: 'get',
    //         url: apiBaseUrl + '/api/category/list',
    //         headers: {
    //             "Authorization": `Bearer ${token}`
    //         }
    //     })
    //     .then()
    // }

    const onSubmit: SubmitHandler<RequestFormData> = (data) => {
        console.log('request is ', data);
    }


    const onSelectedCategory = (event: any) => {
        let list: any = []
        // console.log('event', event)
        console.log('event', event.target.value)
        subcategoryList.map((data: any) => {
            if (data.category === event.target.value) {
                list.push(data);
            }
        })
        setSubcategoryOptions(list)
    }

    const getSubcategoryByCategoryOptions = () => {
        return subcategoryOptions.map((data: any, key: number) => {
            return <option key={'subcategory' + key} value={data.id}>{data.name}</option>
        })
    }

    return (
        <>
            <Button onClick={onOpen}>Make Request</Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Request Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form>
                        <FormControl mb={2}>
                            <FormLabel>Category</FormLabel>
                            <Select
                                {...register("requestCategory", {
                                    required: 'Category is required'
                                })}
                                onChange={onSelectedCategory}
                                placeholder="Select Category"
                            >
                                {
                                    categoryList.map((data: any, key) => {
                                        return <option key={'category' + key}
                                                value={data.id}>{data.name}</option>
                                    })
                                }
                            </Select>
                            <div className="text-red-600 pl-2 mt-2">
                                {errors.requestCategory?.message && <span>{errors.requestCategory?.message}</span>}
                            </div>
                        </FormControl>
                        <FormControl mb={2}>
                            <FormLabel>Sub Category</FormLabel>
                            <Select
                                {...register("requestSubCategory", {
                                    required: 'Sub Category is required'
                                })}
                                placeholder="Select Sub Category"
                            >
                                {
                                    getSubcategoryByCategoryOptions()
                                }
                            </Select>
                            <div className="text-red-600 pl-2 mt-2">
                                {errors.requestSubCategory?.message && <span>{errors.requestSubCategory?.message}</span>}
                            </div>
                        </FormControl>
                        <Stack direction='row' justifyContent='space-between'>
                            <FormControl mb={2}>
                                <FormLabel>Date From</FormLabel>
                                <Input
                                    type='date'
                                    {...register("dateFrom", {
                                        required: 'Date from is required'
                                    })}
                                />
                                <div className="text-red-600 pl-2 mt-2">
                                    {errors.dateFrom?.message && <span>{errors.dateFrom?.message}</span>}
                                </div>
                            </FormControl>
                            <FormControl mb={2}>
                                <FormLabel>Date To</FormLabel>
                                <Input
                                    type='date'
                                    {...register("dateTo", {
                                        required: 'Date to is required'
                                    })}
                                />
                                <div className="text-red-600 pl-2 mt-2">
                                    {errors.dateTo?.message && <span>{errors.dateTo?.message}</span>}
                                </div>
                            </FormControl>
                        </Stack>
                        <FormControl>
                            <FormLabel>Reason</FormLabel>
                            <Textarea
                                {...register("reason", {
                                    required: "Reason is required"
                                })}
                            ></Textarea>
                            <div className="text-red-600 pl-2 mt-2">
                                {errors.reason?.message && <span>{errors.reason?.message}</span>}
                            </div>
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue'
                            onClick={handleSubmit(onSubmit)}
                            mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RequestForm;
