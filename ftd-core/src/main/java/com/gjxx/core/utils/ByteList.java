package com.gjxx.core.utils;

import java.io.ByteArrayInputStream;

/**
 * 将byte数组封装为List
 * @author wugang
 */
public class ByteList implements java.io.Serializable {

	private static final long serialVersionUID = -3960956561728079207L;

	private byte[] elementData;

	private int size;
	
	private static final int DEFAULT_SIZE = 10;

	/**
	 * constructor with size
	 * @param initialCapacity size
	 */
	public ByteList(int initialCapacity) {
		if (initialCapacity < 0) {
			throw new IllegalArgumentException("Illegal Capacity: " + initialCapacity);
		}
		this.elementData = new byte[initialCapacity];
	}

	/**
	 * constructor, default size is 10
	 */
	public ByteList() {
		this(DEFAULT_SIZE);
	}

	/**
	 * Increases the capacity of this <tt>ByteList</tt> instance, if
	 * necessary, to ensure that it can hold at least the number of elements
	 * specified by the minimum capacity argument.
	 * 
	 * @param minCapacity
	 *            the desired minimum capacity.
	 */
	public void ensureCapacity(int minCapacity) {
		int oldCapacity = elementData.length;
		if (minCapacity > oldCapacity) {
			byte[] oldData = elementData;
			int newCapacity = oldCapacity + DEFAULT_SIZE;
			elementData = new byte[newCapacity];
			System.arraycopy(oldData, 0, elementData, 0, size);
		}
	}

	/**
	 * Returns the number of elements in this list.
	 * 
	 * @return the number of elements in this list.
	 */
	public int size() {
		return size;
	}

	/**
	 * Tests if this list has no elements.
	 * 
	 * @return <tt>true</tt> if this list has no elements; <tt>false</tt>
	 *         otherwise.
	 */
	public boolean isEmpty() {
		return size == 0;
	}

	/**
	 * Returns an array containing all of the elements in this list in the
	 * correct order.
	 * 
	 * @return an array containing all of the elements in this list in the
	 *         correct order.
	 */
	public byte[] toArray() {
		byte[] result = new byte[size];
		System.arraycopy(elementData, 0, result, 0, size);
		return result;
	}

	/**
	 * getByteArrayInputStream
	 * @return
	 */
	public ByteArrayInputStream getByteArrayInputStream() {
		return new ByteArrayInputStream(elementData, 0, size);
	}


	/**
	 * Returns the element at the specified position in this list.
	 * 
	 * @param index
	 *            index of element to return.
	 * @return the element at the specified position in this list.
	 * @throws IndexOutOfBoundsException
	 *             if index is out of range <tt>(index &lt; 0 || index &gt;= size())</tt>.
	 */
	public byte get(int index) throws IndexOutOfBoundsException {
		rangeCheck(index);
		return elementData[index];
	}

	/**
	 * Appends the specified element to the end of this list.
	 * 
	 * @param o
	 *            element to be appended to this list.
	 * @return <tt>true</tt> (as per the general contract of Collection.add).
	 */
	public boolean add(byte o) {
		ensureCapacity(size + 1);
		elementData[size++] = o;
		return true;
	}

	/**
	 * add all
	 * @param bs bytes
	 * @return
	 */
	public boolean addAll(byte[] bs) {
		if (bs != null) {
			for (int i = 0; i < bs.length; i++) {
				add(bs[i]);
			}
		}
		return true;
	}

	/**
	 * add all
	 * @param bList list
	 * @return
	 */
	public boolean addAll(ByteList bList) {
		if (bList != null) {
			for (int i = 0; i < bList.size; i++) {
				add(bList.get(i));
			}
		}
		return true;
	}

	/**
	 * Removes the element at the specified position in this list. Shifts any
	 * subsequent elements to the left (subtracts one from their indices).
	 * 
	 * @param index
	 *            the index of the element to removed.
	 * @return the element that was removed from the list.
	 * @throws IndexOutOfBoundsException
	 *             if index out of range <tt>(index
	 *        &lt; 0 || index &gt;= size())</tt>.
	 */
	public int remove(int index) throws IndexOutOfBoundsException {
		rangeCheck(index);

		int oldValue = elementData[index];

		int numMoved = size - index - 1;
		if (numMoved > 0) {
			System.arraycopy(elementData, index + 1, elementData, index, numMoved);
		}
		elementData[--size] = 0; 

		return oldValue;
	}

	/**
	 * Check if the given index is in range. If not, throw an appropriate runtime exception.
	 * @param index index
	 * @throws IndexOutOfBoundsException IndexOutOfBoundsException
	 */
	private void rangeCheck(int index) throws IndexOutOfBoundsException {
		if (index >= size) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
		}
	}

	/**
	 * Removes all of the elements from this list. The list will be empty after
	 * this call returns.
	 */
	public void clear() {
		for (int i = 0; i < size; i++) {
			elementData[i] = 0;
		}
		size = 0;
	}

	/**
	 * Returns a string representation of the object.
	 * @param offset offset
	 * @param length length
	 * @return a string representation of the object.
	 */
	public String toString(int offset, int length) {
		return new String(elementData, offset, length);
	}

	/** 
	 * {@inheritDoc}
	 * @see Object#toString()
	 */
	public String toString() {
		return new String(elementData, 0, size);
	}
}